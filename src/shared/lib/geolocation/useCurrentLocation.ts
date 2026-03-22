import { useEffect, useState } from "react";
import { getCurrentPosition } from "./getCurrentPosition";

type CurrentLocationState =
  | {
      status: "idle" | "pending";
      data: null;
      error: null;
    }
  | {
      status: "success";
      data: {
        lat: number;
        lon: number;
      };
      error: null;
    }
  | {
      status: "error";
      data: null;
      error: Error;
    };

export function useCurrentLocation(
  options?: PositionOptions,
): CurrentLocationState {
  const [state, setState] = useState<CurrentLocationState>({
    status: "pending",
    data: null,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    getCurrentPosition(options).then(
      (position) => {
        if (!isMounted) {
          return;
        }

        setState({
          status: "success",
          data: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
        });
      },
      (error: unknown) => {
        if (!isMounted) {
          return;
        }

        setState({
          status: "error",
          data: null,
          error:
            error instanceof Error
              ? error
              : new Error("현재 위치를 가져오지 못했습니다."),
        });
      },
    );

    return () => {
      isMounted = false;
    };
  }, [options]);

  return state;
}
