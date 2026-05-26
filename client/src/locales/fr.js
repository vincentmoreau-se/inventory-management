export default {
  // Navigation
  nav: {
    overview: 'Vue d\'ensemble',
    inventory: 'Inventaire',
    orders: 'Commandes',
    finance: 'Finance',
    demandForecast: 'Prévisions de demande',
    restocking: 'Réapprovisionnement',
    reports: 'Rapports',
    companyName: 'Catalyst Components',
    subtitle: 'Système de gestion des stocks'
  },

  // Dashboard
  dashboard: {
    title: 'Vue d\'ensemble',
    kpi: {
      title: 'Indicateurs clés de performance',
      inventoryTurnover: 'Taux de rotation des stocks',
      ordersFulfilled: 'Commandes exécutées',
      orderFillRate: 'Taux d\'exécution',
      revenue: 'CA (Commandes)',
      revenueYTD: 'CA (Commandes) YTD',
      revenueMTD: 'CA (Commandes) MTD',
      avgProcessingTime: 'Temps de traitement moy. (Jours)',
      goal: 'Objectif'
    },
    summary: {
      title: 'Résumé'
    },
    orderHealth: {
      title: 'Santé des commandes',
      totalOrders: 'Total commandes',
      revenue: 'CA',
      avgOrderValue: 'Valeur moy./commande',
      onTimeRate: 'Taux de ponctualité',
      avgFulfillmentDays: 'Traitement moy. (Jours)',
      total: 'Total'
    },
    ordersByMonth: {
      title: 'Commandes par mois'
    },
    inventoryValue: {
      title: 'Valeur des stocks par catégorie'
    },
    inventoryShortages: {
      title: 'Ruptures de stock',
      noShortages: 'Aucune rupture - toutes les commandes peuvent être exécutées !',
      noData: 'Aucune donnée pour les filtres sélectionnés',
      orderId: 'N° commande',
      sku: 'SKU',
      itemName: 'Article',
      quantityNeeded: 'Qté requise',
      quantityAvailable: 'Qté disponible',
      shortage: 'Manquant',
      daysDelayed: 'Jours de retard',
      priority: 'Priorité',
      unitsShort: 'unités manquantes',
      days: 'jours',
      actions: 'Actions'
    },
    createPO: 'Créer BC',
    viewPO: 'Voir BC',
    topProducts: {
      title: 'Top produits par CA',
      sku: 'SKU',
      product: 'Produit',
      category: 'Catégorie',
      warehouse: 'Entrepôt',
      stockStatus: 'État du stock',
      revenue: 'CA',
      unitsOrdered: 'Unités commandées',
      firstOrder: 'Première commande',
      inStock: 'En stock',
      lowStock: 'Stock faible'
    }
  },

  // Inventory
  inventory: {
    title: 'Inventaire',
    description: 'Suivre et gérer tous les articles en stock',
    stockLevels: 'Niveaux de stock',
    skus: 'SKUs',
    searchPlaceholder: 'Rechercher par nom d\'article...',
    clearSearch: 'Effacer la recherche',
    totalItems: 'Total articles',
    totalValue: 'Valeur totale',
    lowStockItems: 'Articles en stock faible',
    warehouses: 'Entrepôts',
    table: {
      sku: 'SKU',
      itemName: 'Article',
      name: 'Nom',
      category: 'Catégorie',
      warehouse: 'Entrepôt',
      quantity: 'Quantité',
      quantityOnHand: 'Quantité disponible',
      reorderPoint: 'Point de réappro.',
      unitCost: 'Coût unitaire',
      unitPrice: 'Prix unitaire',
      totalValue: 'Valeur totale',
      location: 'Localisation',
      status: 'Statut'
    }
  },

  // Orders
  orders: {
    title: 'Commandes',
    description: 'Consulter et gérer les commandes clients',
    allOrders: 'Toutes les commandes',
    totalOrders: 'Total commandes',
    totalRevenue: 'CA total',
    avgOrderValue: 'Valeur moy./commande',
    onTimeDelivery: 'Livraison ponctuelle',
    itemsCount: '{count} articles',
    quantity: 'Qté',
    submittedOrders: 'Commandes soumises',
    noRestockingOrders: 'Aucune commande de réapprovisionnement soumise',
    leadTimeDays: '{days} jours',
    table: {
      orderNumber: 'N° commande',
      orderId: 'ID commande',
      orderDate: 'Date de commande',
      date: 'Date',
      customer: 'Client',
      category: 'Catégorie',
      warehouse: 'Entrepôt',
      items: 'Articles',
      value: 'Valeur',
      totalValue: 'Valeur totale',
      status: 'Statut',
      expectedDelivery: 'Livraison prévue',
      actualDelivery: 'Livraison réelle',
      submitted: 'Soumis le',
      leadTime: 'Délai',
      totalCost: 'Coût total'
    }
  },

  // Finance/Spending
  finance: {
    title: 'Tableau de bord financier',
    description: 'Suivre les revenus, coûts et performances financières',
    totalRevenue: 'CA total',
    totalCosts: 'Coûts totaux',
    netProfit: 'Bénéfice net',
    avgOrderValue: 'Valeur moy./commande',
    fromOrders: 'De {count} commandes',
    costBreakdown: 'Approvisionnement + Opérationnel + Main-d\'œuvre + Frais généraux',
    margin: 'marge',
    perOrderRevenue: 'CA par commande',
    revenueVsCosts: {
      title: 'CA mensuel vs Coûts',
      revenue: 'CA',
      costs: 'Coûts totaux'
    },
    monthlyCostFlow: {
      title: 'Flux de coûts mensuel',
      procurement: 'Approvisionnement',
      operational: 'Opérationnel',
      labor: 'Main-d\'œuvre',
      overhead: 'Frais généraux'
    },
    categorySpending: {
      title: 'Dépenses par catégorie',
      ofTotal: 'du total'
    },
    transactions: {
      title: 'Transactions récentes',
      id: 'ID',
      description: 'Description',
      vendor: 'Fournisseur',
      date: 'Date',
      amount: 'Montant'
    }
  },

  // Demand Forecast
  demand: {
    title: 'Prévisions de demande',
    description: 'Analyser les tendances et prévisions de demande',
    increasingDemand: 'Demande croissante',
    stableDemand: 'Demande stable',
    decreasingDemand: 'Demande décroissante',
    itemsCount: '{count} articles',
    more: 'plus...',
    demandForecasts: 'Prévisions de demande',
    table: {
      sku: 'SKU',
      itemName: 'Article',
      currentDemand: 'Demande actuelle',
      forecastedDemand: 'Demande prévue',
      change: 'Variation',
      trend: 'Tendance',
      period: 'Période'
    }
  },

  // Reports
  reports: {
    title: 'Rapports de performance',
    description: 'Consulter les métriques trimestrielles et tendances mensuelles',
    quarterlyPerformance: 'Performance trimestrielle',
    monthlyRevenueTrend: 'Tendance du CA mensuel',
    monthOverMonth: 'Analyse mois par mois',
    quarter: 'Trimestre',
    totalOrders: 'Total commandes',
    totalRevenue: 'CA total',
    avgOrderValue: 'Valeur moy./commande',
    fulfillmentRate: 'Taux d\'exécution',
    month: 'Mois',
    orders: 'Commandes',
    revenue: 'CA',
    change: 'Variation',
    growthRate: 'Taux de croissance',
    totalRevenueYTD: 'CA total (YTD)',
    avgMonthlyRevenue: 'CA mensuel moyen',
    totalOrdersYTD: 'Total commandes (YTD)',
    bestQuarter: 'Meilleur trimestre'
  },

  // Backlog
  backlog: {
    title: 'Gestion des arriérés',
    description: 'Suivre et résoudre les ruptures de stock',
    highPriority: 'Priorité haute',
    mediumPriority: 'Priorité moyenne',
    lowPriority: 'Priorité basse',
    totalItems: 'Total des arriérés',
    backlogItems: 'Articles en arriéré',
    noBacklog: 'Aucun arriéré - toutes les commandes peuvent être exécutées !',
    unitsShort: 'unités manquantes',
    days: 'jours',
    table: {
      orderId: 'N° commande',
      sku: 'SKU',
      itemName: 'Article',
      quantityNeeded: 'Qté requise',
      quantityAvailable: 'Qté disponible',
      shortage: 'Manquant',
      daysDelayed: 'Jours de retard',
      priority: 'Priorité'
    }
  },

  // Restocking
  restocking: {
    title: 'Réapprovisionnement',
    description: 'Recommander et commander des stocks selon les prévisions de demande et le budget disponible.',
    availableBudget: 'Budget disponible',
    dragToAdjust: 'Glisser pour ajuster',
    itemsSelected: 'Articles sélectionnés',
    totalCost: 'Coût total',
    remainingBudget: 'Budget restant',
    recommendations: 'Recommandations de réapprovisionnement',
    of: 'sur',
    noRecommendations: 'Aucune recommandation disponible',
    critical: 'Critique',
    low: 'Faible',
    ok: 'OK',
    overBudget: 'Hors budget',
    placeOrder: 'Passer la commande',
    submitting: 'Envoi en cours...',
    table: {
      sku: 'SKU',
      itemName: 'Article',
      category: 'Catégorie',
      onHand: 'En stock',
      reorderPoint: 'Point de réappro.',
      forecastedDemand: 'Demande prévue',
      unitCost: 'Coût unitaire',
      qty: 'Qté',
      totalCost: 'Coût total',
      status: 'Statut'
    }
  },

  // Filters
  filters: {
    timePeriod: 'Période',
    location: 'Localisation',
    category: 'Catégorie',
    orderStatus: 'Statut commande',
    all: 'Tous',
    allMonths: 'Tous les mois'
  },

  // Statuses
  status: {
    delivered: 'Livré',
    shipped: 'Expédié',
    processing: 'En traitement',
    backordered: 'En rupture',
    inStock: 'En stock',
    lowStock: 'Stock faible',
    adequate: 'Adéquat'
  },

  // Trends
  trends: {
    increasing: 'croissant',
    stable: 'stable',
    decreasing: 'décroissant'
  },

  // Priority
  priority: {
    high: 'Haute',
    medium: 'Moyenne',
    low: 'Basse'
  },

  // Categories
  categories: {
    circuitBoards: 'Circuits imprimés',
    sensors: 'Capteurs',
    actuators: 'Actionneurs',
    controllers: 'Contrôleurs',
    powerSupplies: 'Alimentations'
  },

  // Spending Categories
  spendingCategories: {
    rawMaterials: 'Matières premières',
    components: 'Composants',
    equipment: 'Équipement',
    consumables: 'Consommables'
  },

  // Warehouses
  warehouses: {
    sanFrancisco: 'San Francisco',
    london: 'Londres',
    tokyo: 'Tokyo'
  },

  // Months
  months: {
    jan: 'Jan',
    feb: 'Fév',
    mar: 'Mar',
    apr: 'Avr',
    may: 'Mai',
    jun: 'Jun',
    jul: 'Jul',
    aug: 'Aoû',
    sep: 'Sep',
    oct: 'Oct',
    nov: 'Nov',
    dec: 'Déc',
    january: 'Janvier',
    february: 'Février',
    march: 'Mars',
    april: 'Avril',
    june: 'Juin',
    july: 'Juillet',
    august: 'Août',
    september: 'Septembre',
    october: 'Octobre',
    november: 'Novembre',
    december: 'Décembre'
  },

  // Profile Menu
  profile: {
    profileDetails: 'Profil',
    myTasks: 'Mes tâches',
    logout: 'Déconnexion'
  },

  // Profile Details Modal
  profileDetails: {
    title: 'Détails du profil',
    email: 'E-mail',
    department: 'Département',
    location: 'Localisation',
    phone: 'Téléphone',
    joinDate: 'Date d\'embauche',
    employeeId: 'N° employé',
    close: 'Fermer'
  },

  // Tasks Modal
  tasks: {
    title: 'Mes tâches',
    taskTitle: 'Titre de la tâche',
    taskTitlePlaceholder: 'Saisir un titre de tâche...',
    priority: 'Priorité',
    dueDate: 'Échéance',
    addTask: 'Ajouter une tâche',
    noTasks: 'Aucune tâche. Ajoutez votre première tâche ci-dessus !'
  },

  // Language
  language: {
    english: 'Anglais',
    japanese: 'Japonais',
    french: 'Français',
    selectLanguage: 'Choisir la langue'
  },

  // Common
  common: {
    loading: 'Chargement...',
    error: 'Erreur',
    noData: 'Aucune donnée disponible',
    viewDetails: 'Voir les détails',
    close: 'Fermer',
    save: 'Enregistrer',
    cancel: 'Annuler',
    search: 'Rechercher',
    filter: 'Filtrer',
    export: 'Exporter',
    items: 'articles'
  }
}
