import { useState } from 'react';
import { useStudentStore } from '@/store/studentStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import StudentFilter from '@/components/StudentFilter';

export default function Payments() {
  const { students, payments, addPayment, getTotalPaid, getRemainingDue } = useStudentStore();
  const [selectedStudent, setSelectedStudent] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState<'cash' | 'online'>('cash');

  const student = students.find((s) => s.id === selectedStudent);
  const studentPayments = payments.filter((p) => p.studentId === selectedStudent);
  const totalPaid = selectedStudent ? getTotalPaid(selectedStudent) : 0;
  const remaining = selectedStudent ? getRemainingDue(selectedStudent) : 0;

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(amount);
    if (!selectedStudent || amt <= 0) return;
    addPayment({ studentId: selectedStudent, amount: amt, mode, date: new Date().toISOString().split('T')[0] });
    setAmount('');
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Fee Payments</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage student fee payments</p>
        </div>
      </div>

      <StudentFilter selectedStudent={selectedStudent} onSelectStudent={setSelectedStudent} label="Select Student for Payment" />

      {student && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="stat-card">
              <p className="text-sm text-muted-foreground">Total Fee</p>
              <p className="text-2xl font-bold mt-1">₹{student.totalFee.toLocaleString()}</p>
            </div>
            <div className="stat-card">
              <p className="text-sm text-muted-foreground">Total Paid</p>
              <p className="text-2xl font-bold text-success mt-1">₹{totalPaid.toLocaleString()}</p>
            </div>
            <div className="stat-card">
              <p className="text-sm text-muted-foreground">Remaining Due</p>
              <p className={`text-2xl font-bold mt-1 ${remaining > 0 ? 'text-destructive' : 'text-success'}`}>₹{remaining.toLocaleString()}</p>
            </div>
          </div>

          {/* Add Payment Button */}
          <div className="flex justify-end">
            <Button onClick={() => setDialogOpen(true)} className="gap-2" disabled={remaining <= 0}>
              <Plus className="h-4 w-4" /> Add Payment
            </Button>
          </div>

          {/* Payment History */}
          <div className="bg-card rounded-xl shadow-[var(--shadow-card)] overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-lg font-semibold font-display">Payment History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Receipt #</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Amount</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Mode</th>
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {studentPayments.map((p) => (
                    <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-3 font-mono text-xs">{p.receiptNumber}</td>
                      <td className="px-6 py-3 font-medium text-success">₹{p.amount.toLocaleString()}</td>
                      <td className="px-6 py-3 capitalize">{p.mode}</td>
                      <td className="px-6 py-3 text-muted-foreground">{p.date}</td>
                    </tr>
                  ))}
                  {studentPayments.length === 0 && (
                    <tr><td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">No payments recorded</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Add Payment Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display">Add Payment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddPayment} className="space-y-4">
            <div className="space-y-2">
              <Label>Amount (₹)</Label>
              <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} min={1} max={remaining} required />
              <p className="text-xs text-muted-foreground">Max: ₹{remaining.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <Label>Payment Mode</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as 'cash' | 'online')}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit">Record Payment</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
