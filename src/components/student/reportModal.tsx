import { useEffect, useState } from 'react';
import { 
  DialogContent, DialogHeader, DialogTitle, DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function ReportModal() {
  const [message, setMessage] = useState('');
  const [reports, setReports] =  useState([]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/Student/sendReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });
      if (response.ok) {
        setMessage(''); 
      } else {
        console.error('Failed to send report');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  async function getReportsHistory(){
    const res = await fetch('/api/Student/getstudentReports');
    if(res.ok){
      const resp = await res.json();
      setReports(resp);
    }
  }

  useEffect(()=>{
     getReportsHistory();
  },[])

  return (
    <DialogContent className="sm:max-w-[800px]">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <DialogHeader>
            <DialogTitle>Report a Problem</DialogTitle>
            <DialogDescription>Submit a report to staff.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="report-subject">Subject</Label>
              <Textarea
                id="report-subject"
                placeholder="Describe the problem you're facing..."
                className="min-h-[120px]"
                value={message}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit">Send Report</Button>
          </form>
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
                {reports.map((report,index)=>
                    <TableRow key={index}>
                    <TableCell>{report.content}</TableCell>
                    <TableCell>{report.reportedAt}</TableCell>
                    </TableRow>    
                )}
                        
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </DialogContent>
  );
}
