"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const ReportDialog = ({
  open,
  handleClose,
  studentId,
}) => {
  const { toast } = useToast();
  const [reason , setReason] = useState('Disruptive Behavior');
  const [description , setDescription]  = useState('');



  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/Driver/reportStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          reason,
          studentId,
        }),
      });

      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Report submitted successfully:", data);
      toast({
        variant: "success",
        title: "Report Submitted",
        description: "The report has been submitted successfully.",
      });
      resetForm();
      handleClose();
    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  const resetForm = () => {
    setReason("Disruptive Behavior");
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className=" sm:w-100 lg:w-[300px] md:w-[300px] xl:w-[500px]">
        <div className="grid gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Report Form</h2>
            <div className="h-[1px] w-full bg-gray-200" />
          </div>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <label
                className="text-sm font-medium text-gray-900"
                htmlFor="select"
              >
                Select a Reason:
              </label>
            </div>
            <div className="relative">
              <select
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
                id="select"
                onChange={(e) => setReason(e.target.value)}
                defaultValue='Disruptive Behavior'
              >
                <option value="Disruptive Behavior">Disruptive Behavior</option>
                <option value="Damage to Property">Damage to Property</option>
                <option value="Safety Violations">Safety Violations</option>
                <option value="Misconduct">Misconduct</option>
              </select>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <label
                className="text-sm font-medium text-gray-900"
                htmlFor="description"
              >
                Description:
              </label>
            </div>
            <textarea
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
              id="description"
              placeholder="Enter a description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleSubmit}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;
