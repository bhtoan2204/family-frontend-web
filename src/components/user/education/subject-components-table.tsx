"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ComponentScore } from "@/types/education";
import AddComponentIndex from "./add-component-index";
import DeleteComponentDialog from "./delete-component-dialog";
import EditComponentIndex from "./edit-component-index";

interface SubjectComponentsTableProps {
  componentScores: ComponentScore[];
  onAddSubmit: (data: any, index: number) => void;
  onDelete: (index: number) => void;
  onEditSubmit: (data: any, index: number, oldIndex: number) => void;
  isComponentLoading: boolean;
  componentForm: any;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const SubjectComponentsTable = ({
  componentScores,
  onAddSubmit,
  onDelete,
  onEditSubmit,
  isComponentLoading,
  componentForm,
  onOpen,
  onClose,
  isOpen,
}: SubjectComponentsTableProps) => {
  return (
    <Table className="border w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">No.</TableHead>
          <TableHead className="text-center">Component</TableHead>
          <TableHead className="text-center">Score</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!componentScores && (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No data available
            </TableCell>
          </TableRow>
        )}
        {componentScores?.map((component, index) => (
          <TableRow key={component.component_name}>
            <TableCell className="text-center">{index + 1}</TableCell>
            <TableCell className="text-center">
              {component.component_name}
            </TableCell>
            <TableCell className="text-center">{component.score}</TableCell>
            <TableCell className="flex items-center justify-center gap-1">
              <AddComponentIndex
                onSubmit={onAddSubmit}
                isComponentLoading={isComponentLoading}
                componentForm={componentForm}
                index={index}
              />
              <EditComponentIndex
                onSubmit={onEditSubmit}
                isComponentLoading={isComponentLoading}
                componentForm={componentForm}
                index={index}
                componentScore={component}
                indexLength={componentScores.length}
              />
              <DeleteComponentDialog
                onDelete={onDelete}
                onOpen={onOpen}
                onClose={onClose}
                isOpen={isOpen}
                index={index}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SubjectComponentsTable;
