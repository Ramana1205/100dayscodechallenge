import { useState } from 'react';
import { useStudentStore } from '@/store/studentStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Printer, GraduationCap } from 'lucide-react';
import StudentFilter from '@/components/StudentFilter';

export default function HallTicket() {
  const { students } = useStudentStore();
  const [selectedStudent, setSelectedStudent] = useState('');
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [academicYear, setAcademicYear] = useState('2024-2025');

  const student = students.find((s) => s.id === selectedStudent);
  const canPreview = student && examName.trim() && examDate;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header no-print">
        <div>
          <h1 className="page-title">Hall Ticket</h1>
          <p className="text-sm text-muted-foreground mt-1">Generate exam hall tickets</p>
        </div>
      </div>

      <div className="no-print">
        <StudentFilter selectedStudent={selectedStudent} onSelectStudent={setSelectedStudent} label="Select Student" />
      </div>

      <div className="bg-card rounded-xl shadow-[var(--shadow-card)] p-6 no-print">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Exam Name</Label>
            <Input value={examName} onChange={(e) => setExamName(e.target.value)} placeholder="e.g. Mid-Term Examination" maxLength={100} />
          </div>
          <div className="space-y-2">
            <Label>Exam Date</Label>
            <Input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Academic Year</Label>
            <Input value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} maxLength={20} />
          </div>
        </div>
      </div>

      {canPreview && (
        <>
          <div className="flex justify-end no-print">
            <Button onClick={() => window.print()} className="gap-2">
              <Printer className="h-4 w-4" /> Print Hall Ticket
            </Button>
          </div>

          <div className="print-container bg-card rounded-xl shadow-[var(--shadow-card)] p-8 max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <GraduationCap className="h-96 w-96" />
            </div>

            <div className="text-center mb-6 relative z-10">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary mb-2">
                <GraduationCap className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold font-display text-foreground">Sadhana Memorial School</h1>
              <p className="text-sm text-muted-foreground">123 Education Lane, Knowledge City</p>
              <div className="mt-3 h-1 w-32 mx-auto bg-primary rounded-full" />
            </div>

            <h2 className="text-center text-lg font-bold mb-1 text-foreground uppercase tracking-wider">HALL TICKET</h2>
            <p className="text-center text-sm text-muted-foreground mb-6">Academic Year: {academicYear}</p>

            <div className="flex gap-6 mb-6 relative z-10">
              <div className="flex-1 space-y-3">
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <tbody>
                      {[
                        ['Student Name', student.name],
                        ['Class & Section', `${student.class}-${student.section}`],
                        ['Roll Number', student.rollNumber],
                        ['Exam', examName],
                        ['Exam Date', examDate],
                      ].map(([label, value]) => (
                        <tr key={label} className="border-b border-border last:border-0">
                          <td className="px-4 py-2 bg-muted/50 font-medium text-muted-foreground w-40">{label}</td>
                          <td className="px-4 py-2 font-semibold">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="shrink-0">
                {student.photo ? (
                  <img src={student.photo} alt={student.name} className="h-32 w-28 object-cover rounded-lg border border-border" />
                ) : (
                  <div className="h-32 w-28 rounded-lg border-2 border-dashed border-border flex items-center justify-center text-xs text-muted-foreground">
                    Photo
                  </div>
                )}
              </div>
            </div>

            <div className="mt-16 flex justify-between items-end text-sm relative z-10">
              <div className="text-center">
                <div className="w-40 border-t border-foreground pt-2">
                  <p className="font-medium">Invigilator</p>
                </div>
              </div>
              <div className="text-center">
                <div className="w-40 border-t border-foreground pt-2">
                  <p className="font-medium">Principal</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
