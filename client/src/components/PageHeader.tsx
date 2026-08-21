import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  action?: ReactNode;
}

function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <div className="page-header">
      <h2 className="page-title">{title}</h2>
      {action}
    </div>
  );
}

export default PageHeader;
