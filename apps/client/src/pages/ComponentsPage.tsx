import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter 
} from "../components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Progress } from "../components/ui/progress"
import { Badge } from "../components/ui/badge"

export function ReporteCostos() {
  return (
    <Card className="w-full shadow-lg border-zinc-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold">Resumen de Ejecución Presupuestaria</CardTitle>
          <p className="text-sm text-muted-foreground">Business & Development Venezuela</p>
        </div>
        
        {/* Filtro de Centro de Costo */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Centro de Costo:</span>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="tk3">MATERIALES_TK3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[40%]">Descripción / Row Labels</TableHead>
              <TableHead className="text-right">Costo Estimado</TableHead>
              <TableHead className="text-right">Monto Ejecutado</TableHead>
              <TableHead className="w-[20%] text-center">Ejecución %</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {/* Ejemplo de Fila de Categoría (Nivel 1) */}
            <TableRow className="font-bold bg-zinc-900/20">
              <TableCell>2. SERVICIOS</TableCell>
              <TableCell className="text-right">$290,680.00</TableCell>
              <TableCell className="text-right">$73,232.99</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <Progress value={25} className="h-2" />
                  <span className="text-[10px] text-center">25.2%</span>
                </div>
              </TableCell>
            </TableRow>

            {/* Ejemplo de Sub-filas (Nivel 2) con indentación */}
            <TableRow>
              <TableCell className="pl-8 text-muted-foreground">2.1 ALQUILER DE GABARRA</TableCell>
              <TableCell className="text-right">$150,000.00</TableCell>
              <TableCell className="text-right">$50,800.00</TableCell>
              <TableCell className="text-center">
                <Badge variant="outline" className="text-green-500">En presupuesto</Badge>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="pl-8 text-muted-foreground">2.2 ALQUILER DE REMOLCADOR</TableCell>
              <TableCell className="text-right">$23,200.00</TableCell>
              <TableCell className="text-right">$14,500.00</TableCell>
              <TableCell className="text-center">
                 <Badge variant="outline" className="text-orange-500">Cercano al límite</Badge>
              </TableCell>
            </TableRow>
          </TableBody>

          <TableFooter className="bg-zinc-900 font-bold">
            <TableRow>
              <TableCell>Total Result</TableCell>
              <TableCell className="text-right">$656,017.66</TableCell>
              <TableCell className="text-right text-orange-500">$418,693.13</TableCell>
              <TableCell className="text-center">63.8% Total</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  )
}