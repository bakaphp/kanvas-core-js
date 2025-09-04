export interface WorkflowFromEntity {
  entity_namespace: string;
  entity_id: string;
  action: string;
  params?: any;
}

export interface RunWorkflowFromEntity {
  runWorkflowFromEntity: {
    [key: string]: any; // Allow any structure within the response
  };
}
