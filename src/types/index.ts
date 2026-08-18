export type QueryStatus = "Processing" | "Completed" | "Human Review"

export type OrderStatus = "Pending" | "Confirmed" | "Processing" | "Delivered"

export type StockAvailability = "In Stock" | "Low Stock" | "Out of Stock"

export type CustomerQuery = {
  id: string
  customerName: string
  email: string
  message: string
  laptopModel: string
  batteryRequirement: string
  confidence: number
  status: QueryStatus
  date: string
}

export type Order = {
  id: string
  customerName: string
  batteryModel: string
  quantity: number
  price: number
  branch: string
  status: OrderStatus
  date: string
}

export type InventoryItem = {
  id: string
  batteryModel: string
  compatibleLaptop: string
  stockQuantity: number
  branch: string
  availability: StockAvailability
  unitPrice: number
}

export type ReviewRequest = {
  id: string
  customerName: string
  email: string
  message: string
  extracted: {
    brand: string
    laptopModel: string
    batteryModel: string
    specification: string
    quantity: number
  }
  confidence: number
  receivedAt: string
}

export type KpiMetric = {
  id: string
  label: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  description: string
}

export type NotificationItem = {
  id: string
  title: string
  description: string
  time: string
  unread: boolean
}

export type SalesPoint = {
  month: string
  revenue: number
  orders: number
}

export type BatterySalesShare = {
  model: string
  units: number
}

export type QueryStat = {
  status: string
  count: number
  fill: string
}
