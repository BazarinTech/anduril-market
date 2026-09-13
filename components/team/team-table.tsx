import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

function TeamTable({
  members,
}: {
  members: TeamUser[]
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-card ring-1 ring-border/70">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-eyebrow text-muted-foreground">Account</TableHead>
            <TableHead className="text-eyebrow text-muted-foreground">Referrer</TableHead>
            <TableHead className="text-eyebrow text-right text-muted-foreground">Deposit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.length > 0 ? (
            members.map((member, index) => (
              <TableRow key={index}>
                <TableCell className="text-xs font-medium tabular-nums">{member.phone}</TableCell>
                <TableCell className="text-xs">{member.refer}</TableCell>
                <TableCell className="text-right">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      member.status === "Active"
                        ? "bg-success-soft text-success"
                        : member.status === "Pending"
                          ? "bg-warning-soft text-warning"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {member.status}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="py-8 text-center text-muted-foreground">
                No team members yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
export default TeamTable