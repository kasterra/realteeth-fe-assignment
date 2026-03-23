import type { ReactNode } from "react";

export interface LocationSearchFormValues {
  query: string;
}

export interface LocationSearchFeatureProps {
  onSelect?: (locationName: string) => void;
  renderResultAction?: (locationName: string) => ReactNode;
}
