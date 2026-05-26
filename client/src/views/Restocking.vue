<template>
  <div class="restocking-view">
    <div class="page-header">
      <h2>{{ t('restocking.title') }}</h2>
      <p>{{ t('restocking.description') }}</p>
    </div>

    <div v-if="loading" class="loading">{{ t('common.loading') }}</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <template v-else>
      <!-- Success banner -->
      <div v-if="successMessage" class="success-banner">
        {{ successMessage }}
      </div>

      <!-- Budget card -->
      <div class="card budget-card">
        <div class="budget-row">
          <div class="budget-label-group">
            <span class="budget-label">{{ t('restocking.availableBudget') }}</span>
            <span class="budget-hint">{{ t('restocking.dragToAdjust') }}</span>
          </div>
          <span class="budget-value">{{ currencySymbol }}{{ budget.toLocaleString() }}</span>
        </div>
        <input
          type="range"
          class="budget-slider"
          min="0"
          max="500000"
          step="1000"
          v-model.number="budget"
        />
        <div class="slider-bounds">
          <span>{{ currencySymbol }}0</span>
          <span>{{ currencySymbol }}500K</span>
        </div>
      </div>

      <!-- Summary stats -->
      <div class="stats-grid">
        <div class="stat-card info">
          <div class="stat-label">{{ t('restocking.itemsSelected') }}</div>
          <div class="stat-value">{{ selectedItems.length }}</div>
        </div>
        <div class="stat-card success">
          <div class="stat-label">{{ t('restocking.totalCost') }}</div>
          <div class="stat-value">{{ currencySymbol }}{{ totalCost.toLocaleString() }}</div>
        </div>
        <div :class="['stat-card', remainingBudgetClass]">
          <div class="stat-label">{{ t('restocking.remainingBudget') }}</div>
          <div class="stat-value">{{ currencySymbol }}{{ remainingBudget.toLocaleString() }}</div>
        </div>
      </div>

      <!-- Recommendations table -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">{{ t('restocking.recommendations') }}</span>
          <span class="budget-count-note">{{ selectedItems.length }} {{ t('restocking.of') }} {{ recommendations.length }} {{ t('common.items') }}</span>
        </div>

        <div v-if="recommendations.length === 0" class="empty-state">
          {{ t('restocking.noRecommendations') }}
        </div>

        <div v-else class="table-container">
          <table>
            <thead>
              <tr>
                <th>{{ t('restocking.table.sku') }}</th>
                <th>{{ t('restocking.table.itemName') }}</th>
                <th>{{ t('restocking.table.category') }}</th>
                <th>{{ t('restocking.table.onHand') }}</th>
                <th>{{ t('restocking.table.reorderPoint') }}</th>
                <th>{{ t('restocking.table.forecastedDemand') }}</th>
                <th>{{ t('restocking.table.unitCost') }}</th>
                <th>{{ t('restocking.table.qty') }}</th>
                <th>{{ t('restocking.table.totalCost') }}</th>
                <th>{{ t('restocking.table.status') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in tableRows"
                :key="row.sku"
                :style="row.withinBudget ? {} : { opacity: 0.45 }"
              >
                <td class="mono">{{ row.sku }}</td>
                <td>{{ row.name }}</td>
                <td>{{ row.category }}</td>
                <td>{{ row.quantity_on_hand.toLocaleString() }}</td>
                <td>{{ row.reorder_point.toLocaleString() }}</td>
                <td>{{ row.forecasted_demand.toLocaleString() }}</td>
                <td>{{ currencySymbol }}{{ row.unit_cost.toLocaleString() }}</td>
                <td>{{ row.recommended_qty.toLocaleString() }}</td>
                <td>{{ currencySymbol }}{{ row.total_cost.toLocaleString() }}</td>
                <td>
                  <template v-if="row.withinBudget">
                    <span v-if="row.is_critical" class="badge danger">{{ t('restocking.critical') }}</span>
                    <span v-else-if="row.quantity_on_hand < row.reorder_point * 1.5" class="badge warning">{{ t('restocking.low') }}</span>
                    <span v-else class="badge success">{{ t('restocking.ok') }}</span>
                  </template>
                  <template v-else>
                    <span class="badge over-budget">{{ t('restocking.overBudget') }}</span>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Place Order button -->
      <div class="order-action">
        <button
          class="place-order-btn"
          :disabled="selectedItems.length === 0 || submitting"
          @click="placeOrder"
        >
          {{ submitting ? t('restocking.submitting') : t('restocking.placeOrder') }}
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { api } from '../api'
import { useFilters } from '../composables/useFilters'
import { useI18n } from '../composables/useI18n'

export default {
  name: 'Restocking',
  setup() {
    const { t, currentCurrency } = useI18n()
    const { selectedLocation, selectedCategory } = useFilters()

    const currencySymbol = computed(() => {
      if (currentCurrency.value === 'JPY') return '¥'
      if (currentCurrency.value === 'EUR') return '€'
      return '$'
    })

    const loading = ref(false)
    const error = ref(null)
    const recommendations = ref([])
    const budget = ref(50000)
    const submitting = ref(false)
    const successMessage = ref(null)
    let successTimer = null

    const loadRecommendations = async () => {
      loading.value = true
      error.value = null
      try {
        recommendations.value = await api.getRestockingRecommendations()
      } catch (err) {
        error.value = 'Failed to load recommendations: ' + err.message
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    // Greedy fill: iterate in order (API already sorted: critical first, then demand desc),
    // include each item if running total + item.total_cost <= budget
    const tableRows = computed(() => {
      let runningTotal = 0
      return recommendations.value.map(item => {
        const fits = runningTotal + item.total_cost <= budget.value
        if (fits) {
          runningTotal += item.total_cost
        }
        return { ...item, withinBudget: fits }
      })
    })

    const selectedItems = computed(() => tableRows.value.filter(r => r.withinBudget))

    const totalCost = computed(() => selectedItems.value.reduce((sum, item) => sum + item.total_cost, 0))

    const remainingBudget = computed(() => budget.value - totalCost.value)

    const remainingBudgetClass = computed(() => {
      if (remainingBudget.value < 0) return 'danger'
      if (remainingBudget.value < budget.value * 0.2) return 'warning'
      return ''
    })

    const placeOrder = async () => {
      if (selectedItems.value.length === 0 || submitting.value) return

      submitting.value = true
      error.value = null

      try {
        const orderItems = selectedItems.value.map(item => ({
          sku: item.sku,
          name: item.name,
          quantity: item.recommended_qty,
          unit_cost: item.unit_cost,
          total_cost: item.total_cost
        }))

        const result = await api.createRestockingOrder(orderItems)

        // Show success banner and auto-dismiss after 5s
        successMessage.value = `Order ${result.order_number} submitted successfully. Expected delivery in ${result.lead_time_days} days.`
        if (successTimer) clearTimeout(successTimer)
        successTimer = setTimeout(() => {
          successMessage.value = null
        }, 5000)

        // Reset budget so the view is ready for the next order
        budget.value = 50000
      } catch (err) {
        error.value = 'Failed to submit order: ' + err.message
        console.error(err)
      } finally {
        submitting.value = false
      }
    }

    watch([selectedLocation, selectedCategory], loadRecommendations)
    onMounted(loadRecommendations)

    return {
      t,
      currencySymbol,
      loading,
      error,
      recommendations,
      budget,
      submitting,
      successMessage,
      tableRows,
      selectedItems,
      totalCost,
      remainingBudget,
      remainingBudgetClass,
      placeOrder
    }
  }
}
</script>

<style scoped>
.restocking-view {
  /* inherits padding from .main-content */
}

/* Success banner */
.success-banner {
  background: #d1fae5;
  border: 1px solid #6ee7b7;
  color: #065f46;
  padding: 0.875rem 1.25rem;
  border-radius: 8px;
  font-size: 0.938rem;
  font-weight: 500;
  margin-bottom: 1.25rem;
}

/* Budget card */
.budget-card {
  margin-bottom: 1.25rem;
}

.budget-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.budget-label-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.budget-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.budget-hint {
  font-size: 0.75rem;
  color: #94a3b8;
}

.budget-value {
  font-size: 2.25rem;
  font-weight: 700;
  color: #2563eb;
  letter-spacing: -0.025em;
  line-height: 1;
}

/* Slider */
.budget-slider {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  border-radius: 3px;
  background: #e2e8f0;
  outline: none;
  cursor: pointer;
  /* Dynamic fill via inline style would require JS; use accent-color as clean fallback */
  accent-color: #2563eb;
  margin-bottom: 0.5rem;
}

.budget-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #2563eb;
  cursor: pointer;
  border: 3px solid #ffffff;
  box-shadow: 0 0 0 1px #2563eb, 0 2px 6px rgba(37, 99, 235, 0.35);
  transition: box-shadow 0.15s ease;
}

.budget-slider::-webkit-slider-thumb:hover {
  box-shadow: 0 0 0 1px #2563eb, 0 2px 10px rgba(37, 99, 235, 0.5);
}

.budget-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #2563eb;
  cursor: pointer;
  border: 3px solid #ffffff;
  box-shadow: 0 0 0 1px #2563eb, 0 2px 6px rgba(37, 99, 235, 0.35);
}

.budget-slider::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: 3px;
  background: #e2e8f0;
}

.budget-slider::-moz-range-track {
  height: 6px;
  border-radius: 3px;
  background: #e2e8f0;
}

.slider-bounds {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
}

/* Table extras */
.budget-count-note {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.mono {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.813rem;
  color: #475569;
}

/* Over-budget badge — neutral gray */
.badge.over-budget {
  background: #f1f5f9;
  color: #64748b;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 3rem;
  color: #64748b;
  font-size: 0.938rem;
}

/* Place Order action */
.order-action {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
}

.place-order-btn {
  padding: 0.75rem 2rem;
  background: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 0.938rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, box-shadow 0.15s ease;
}

.place-order-btn:hover:not(:disabled) {
  background: #1d4ed8;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.place-order-btn:disabled {
  background: #cbd5e1;
  color: #94a3b8;
  cursor: not-allowed;
}
</style>
