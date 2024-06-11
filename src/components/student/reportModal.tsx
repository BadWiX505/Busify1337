
import {  DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

export default function ReportModal() {
  return (
      <DialogContent className="sm:max-w-[800px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle>Report a Problem</DialogTitle>
              <DialogDescription>Submit a report to staff.</DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="report-subject">Subject</Label>
              <Textarea
                id="report-subject"
                placeholder="Describe the issue you're facing..."
                className="min-h-[120px]"
              />
            </div>
            <Button>Send Report</Button>
          </div>
          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle>Reports History</DialogTitle>
              <DialogDescription>View a list of previously submitted reports.</DialogDescription>
            </DialogHeader>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Billing issue</TableCell>
                    <TableCell>2023-06-01</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Account problem</TableCell>
                    <TableCell>2023-05-15</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Deployment error</TableCell>
                    <TableCell>2023-04-30</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </DialogContent>
  )
}