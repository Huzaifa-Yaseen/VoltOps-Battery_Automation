"use client"

import { useMemo, useState } from "react"
import { PackageSearch } from "lucide-react"

import { EmptyState } from "@/components/shared/empty-state"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { TableSkeleton } from "@/components/shared/table-skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSimulatedLoading } from "@/hooks/use-simulated-loading"
import { formatCurrency } from "@/lib/format"
import { orders } from "@/lib/mock-data"

const statusFilters = [
  "All",
  "Pending",
  "Confirmed",
  "Processing",
  "Delivered",
] as const

type StatusFilter = (typeof statusFilters)[number]

export default function OrdersPage() {
  const isLoading = useSimulatedLoading()
  const [status, setStatus] = useState<StatusFilter>("All")

  const filtered = useMemo(() => {
    if (status === "All") {
      return orders
    }

    return orders.filter((order) => order.status === status)
  }, [status])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Orders"
          description="Track battery fulfillment across all retail and warehouse branches."
        />
        <Card>
          <CardContent className="pt-4">
            <TableSkeleton columns={7} />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="Track battery fulfillment across all retail and warehouse branches."
      />
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Order management</CardTitle>
          <Select
            value={status}
            onValueChange={(value) => {
              if (isStatusFilter(value)) {
                setStatus(value)
              }
            }}
          >
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusFilters.map((item) => (
                <SelectItem key={item} value={item}>
                  {item === "All" ? "All statuses" : item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <EmptyState
              icon={PackageSearch}
              title="No orders in this status"
              description="Change the status filter to see additional records."
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Battery Model</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Order Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.batteryModel}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{formatCurrency(order.price)}</TableCell>
                    <TableCell>{order.branch}</TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function isStatusFilter(value: string | null): value is StatusFilter {
  return statusFilters.includes(value as StatusFilter)
}
