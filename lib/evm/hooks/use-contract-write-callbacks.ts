import { useEffect } from "react";
import { WaitWriteTransactionData } from "lib/evm/types";
import { BaseError } from "@wagmi/core/src/errors/base";
import {
  WaitForTransactionReceiptErrorType,
  WriteContractErrorType,
} from "@wagmi/core";

type Props = {
  error?: WriteContractErrorType | WaitForTransactionReceiptErrorType | null;
  waitData: WaitWriteTransactionData | undefined;
  isFetched: boolean;
  onSuccess?: (data: WaitWriteTransactionData) => void;
  onSettled?: (data: WaitWriteTransactionData) => void;
  onError?: (data?: BaseError) => void;
};

export const useContractWriteCallbacks = ({
  waitData,
  isFetched,
  onSuccess,
  onSettled,
  onError,
  error,
}: Props) => {
  useEffect(() => {
    if (isFetched && !!waitData) {
      switch (waitData.status) {
        case "success":
          onSuccess?.(waitData);
          break;
        case "reverted":
          onSettled?.(waitData);
          break;
      }
    }
  }, [isFetched]);

  useEffect(() => {
    if (error) {
      onError?.(error as BaseError);
    }
  }, [error]);
};
