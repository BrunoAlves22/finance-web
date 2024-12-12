import React, { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { InputAttributes } from "react-number-format";
import { Input } from "./ui/input";

const MoneyInput = forwardRef(
  (
    props: NumericFormatProps<InputAttributes>,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <NumericFormat
        {...props}
        getInputRef={ref}
        customInput={Input}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$"
        allowNegative={false}
        value={
          props.value === undefined || props.value === null ? "" : props.value
        } // Permitir valores vazios
      />
    );
  },
);

MoneyInput.displayName = "MoneyInput";

export { MoneyInput };
