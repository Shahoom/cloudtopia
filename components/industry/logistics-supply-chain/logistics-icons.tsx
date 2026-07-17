import {
  Boxes,
  Clock,
  Eye,
  Gauge,
  Headphones,
  Layers,
  MapPin,
  Navigation,
  Package,
  Plane,
  Plug,
  Radar,
  RefreshCw,
  ScanLine,
  Ship,
  ShieldCheck,
  Truck,
  Users,
  Warehouse,
  type LucideIcon,
} from 'lucide-react'

import type { IconKey } from './logistics-supply-chain-content'

/**
 * Maps the serializable IconKey used in bilingual content to a lucide icon
 * component. Kept as a plain (non-'use client', non-'server-only') module so
 * both the server page and the client sub-components can resolve icons without
 * passing component references across the server/client boundary.
 */
export const LOGISTICS_ICONS: Record<IconKey, LucideIcon> = {
  warehouse: Warehouse,
  route: Navigation,
  radar: Radar,
  plug: Plug,
  boxes: Boxes,
  truck: Truck,
  ship: Ship,
  plane: Plane,
  gauge: Gauge,
  scan: ScanLine,
  map: MapPin,
  shield: ShieldCheck,
  layers: Layers,
  eye: Eye,
  refresh: RefreshCw,
  headset: Headphones,
  clock: Clock,
  users: Users,
}

export const PackageIcon = Package
