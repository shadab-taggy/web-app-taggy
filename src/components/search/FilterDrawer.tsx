"use client";

import { useState } from "react";
import { SlidersIcon } from "@/components/icons";
import { FilterPanel } from "@/components/search/FilterPanel";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

/** Below lg the filter sidebar becomes a drawer opened from this button. */
export function FilterDrawer() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" className="lg:hidden" onClick={() => setOpen(true)}>
        <SlidersIcon className="size-4" />
        Filters
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Filters" variant="drawer">
        <FilterPanel onApply={() => setOpen(false)} />
      </Modal>
    </>
  );
}
