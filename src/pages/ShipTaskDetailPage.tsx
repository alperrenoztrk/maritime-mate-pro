import { PagedReadingSurface, type ReadingPage } from "@/components/reader/PagedReadingSurface";

import { useParams, Link } from "react-router-dom";
import { BookOpen, Shield, ClipboardCheck, Lightbulb, Users, Scale } from "lucide-react";
import { getShipTaskBySlug } from "@/data/shipTaskDetailData";
export default function ShipTaskDetailPage() {
  const { taskSlug } = useParams<{ taskSlug: string }>();
  const task = taskSlug ? getShipTaskBySlug(taskSlug) : undefined;

  if (!task) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center space-y-4">
          <h1 className="text-xl font-bold text-foreground">No job found</h1>
        </div>
      </div>
    );
  }

  const pages:ReadingPage[] = [
  {id:"definition",title:task.title,section:task.category,content:<div className="space-y-4">
    <p>{task.definition}</p><p className="text-sm text-muted-foreground"><strong>Importance:</strong> {task.importance}</p>
  </div>},
  ...task.procedures.map((step,index)=>({
    id:`procedure-${index}`,title:step.title,section:`Procedure · ${index+1}/${task.procedures.length}`,
    content:<p>{step.description}</p>,
  })),
  {id:"responsibilities",title:"Responsibility matrix",section:"Personnel",
   content:<div className="overflow-x-auto"><table className="min-w-max w-full text-left text-sm">
    <thead><tr><th className="p-2">Role</th><th className="p-2">Responsibilities</th></tr></thead>
    <tbody>{task.responsibilities.map((item,index)=><tr key={index} className="border-t border-border/60"><td className="p-2">{item.role}</td><td className="p-2">{item.duties}</td></tr>)}</tbody>
   </table></div>},
  {id:"regulations",title:"Relevant legislation",section:"Legal framework",
   content:<ul className="list-disc space-y-2 pl-5">{task.regulations.map((v,i)=><li key={i}>{v}</li>)}</ul>},
  {id:"checklist",title:"Shipboard checklist",section:"Verification",
   content:<div className="overflow-x-auto"><table className="min-w-max w-full text-left text-sm">
    <thead><tr><th className="p-2">Item</th><th className="p-2">Responsible</th></tr></thead>
    <tbody>{task.checklist.map((v,i)=><tr key={i} className="border-t border-border/60"><td className="p-2">{v.item}</td><td className="p-2">{v.responsible}</td></tr>)}</tbody>
   </table></div>},
  {id:"tip",title:"Practical guidance",section:"Review",content:<p>{task.practicalTip}</p>},
  ];
  return <PagedReadingSurface key={taskSlug} title={task.title} subtitle={task.category}
    pages={pages} storageKey={`mariners-book:ship-task:${taskSlug}`} />;
}
