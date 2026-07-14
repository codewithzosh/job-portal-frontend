import React from "react";
import { Button } from "../../../../components/ui/button";
import { Plus } from "lucide-react";

const AddButton = ({ onClick, label }) => {
  return (
    <Button
      className={"border-dashed"}
      variant="outline"
      size="sm"
      onClick={onClick}
    >
      <Plus className="h-3.5 w-3.5 mr-1.5" />
      {label}
    </Button>
  );
};

export default AddButton;
