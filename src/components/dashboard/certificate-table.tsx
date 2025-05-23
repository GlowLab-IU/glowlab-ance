import { Calendar, Download, Edit, FileText, MoreHorizontal, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StatusBadge } from "@/components/dashboard/status-badge"

interface Certificate {
  id: string
  type: string
  product: string
  authority: string
  status: "active" | "expiring" | "expired" | "pending"
  expiryDate: string
}

interface CertificateTableProps {
  certificates: Certificate[]
}

export function CertificateTable({ certificates }: CertificateTableProps) {
  return (
    <Table>
      <TableHeader className="bg-slate-800/70">
        <TableRow className="border-slate-700 hover:bg-slate-800/50">
          <TableHead className="w-[250px] text-slate-300">Certificate ID</TableHead>
          <TableHead className="text-slate-300">Certificate Type</TableHead>
          <TableHead className="text-slate-300">Product</TableHead>
          <TableHead className="text-slate-300">Issuing Authority</TableHead>
          <TableHead className="text-slate-300">Status</TableHead>
          <TableHead className="text-slate-300">Expiry Date</TableHead>
          <TableHead className="text-right text-slate-300">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {certificates.map((certificate, index) => (
          <TableRow key={index} className="border-slate-700/50 hover:bg-slate-800/50">
            <TableCell className="font-medium text-slate-200">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-400" />
                {certificate.id}
              </div>
            </TableCell>
            <TableCell className="text-slate-300">{certificate.type}</TableCell>
            <TableCell className="text-slate-300">{certificate.product}</TableCell>
            <TableCell className="text-slate-300">{certificate.authority}</TableCell>
            <TableCell>
              <StatusBadge status={certificate.status} />
            </TableCell>
            <TableCell className="text-slate-300">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-slate-400" />
                {certificate.expiryDate}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700 text-slate-200">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem className="hover:bg-slate-700 focus:bg-slate-700">
                    <FileText className="mr-2 h-4 w-4 text-blue-400" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-700 focus:bg-slate-700">
                    <Download className="mr-2 h-4 w-4 text-purple-400" />
                    Download Certificate
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-700 focus:bg-slate-700">
                    <Edit className="mr-2 h-4 w-4 text-amber-400" />
                    Edit Certificate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem className="text-red-400 hover:bg-slate-700 focus:bg-slate-700">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Certificate
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
