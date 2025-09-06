import React from "react";
import {
  Box,
  Flex,
  SystemStyleObject,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  components,
  MultiValue,
  OptionProps,
  Select,
  SingleValue,
  ValueContainerProps,
} from "chakra-react-select";
import {
  groupedNetworkOptionsList,
  OptionTypes,
} from "components/common/select-axelar-network/network-options";

const styles = {
  dropdownIndicator: (provided: SystemStyleObject) => ({
    ...provided,
    backgroundColor: "gray.800",
    color: "gray.50",
    borderColor: "white",
    w: "24px",
    h: "24px",
    pb: "2px",
  }),
  indicatorSeparator: () => ({
    border: "none",
  }),
  containerStyle: (provided: SystemStyleObject) => ({
    ...provided,
    height: "20px",
  }),
  placeholder: (provided: SystemStyleObject) => ({
    ...provided,
    color: "white",
    fontSize: "sm",
    pl: 1,
    pt: "3px",
    fontWeight: "semibold",
    lineHeight: "1em",
  }),
  control: (provided: SystemStyleObject) => ({
    ...provided,
    backgroundColor: "gray.800",
    color: "white",
    borderWidth: "1px",
    borderColor: "gray.500",
    borderRadius: "full",
    fontSize: "sm",
    lineHeight: 5,
    h: "24px",
    minH: "24px",
    px: 2,
    cursor: "pointer",
  }),
  valueContainer: (provided: SystemStyleObject) => ({
    px: 10,
  }),
  menuList: (provided: SystemStyleObject) => ({
    ...provided,
    backgroundColor: "gray.900",
    color: "white",
    borderWidth: "2px",
    borderColor: "gray.900",
    fontSize: "md",
    fontWeight: "semibold",
    borderRadius: 0,
  }),
  groupHeading: (provided: SystemStyleObject) => ({
    ...provided,
    backgroundColor: "gray.900",
    color: "white",
    borderWidth: "2px",
    borderColor: "gray.900",
    fontSize: "lg",
    letterSpacing: "0.025em",
    fontFamily: "heading",
  }),
  option: (provided: SystemStyleObject) => ({
    ...provided,
    backgroundColor: "gray.900",
    color: "white",
    borderWidth: "2px",
    borderColor: "white",
    fontSize: "xl",
  }),
};

const { Option, ValueContainer } = components;

const IconOption = (props: OptionProps<OptionTypes>) => (
  <Box
    sx={{
      "> div": {
        background: "gray.900",
      },
      "> div:hover": {
        backgroundColor: "gray.700",
        cursor: "pointer",
      },
    }}
  >
    <Option {...props}>
      <Flex align={"center"} gap={3}>
        <Flex w={"24px"} h={"24px"} align={"center"} justify={"center"}>
          {props.data.icon}
        </Flex>
        {props.data.label}
      </Flex>
    </Option>
  </Box>
);

const IconValueContainer = (props: ValueContainerProps<OptionTypes>) => {
  const { getValue, hasValue } = props;
  const value = getValue()[0];

  return (
    <ValueContainer {...props}>
      <Flex
        align={"center"}
        gap={2}
        fontSize={"sm"}
        lineHeight={5}
        fontWeight={"semibold"}
        h={"20px"}
      >
        {hasValue ? (
          <Flex w={"24px"} h={"24px"} align={"center"} justify={"center"}>
            {value.icon}
          </Flex>
        ) : null}
        <Flex pb={"2px"}>{props.children}</Flex>
      </Flex>
    </ValueContainer>
  );
};

type Props = {
  onChange: (e: any) => void;
  name: string;
};

export const SelectAxelarNetwork = ({ onChange, name }: Props) => {
  const placeholder = useBreakpointValue(
    {
      base: "Network",
      md: "Select Network",
    },
    {
      fallback: "md",
    }
  );

  const onSelectValueChange = (props: SingleValue<OptionTypes>) => {
    const value = props?.value;

    const event = {
      target: { name, value },
    };

    onChange(event);
  };

  return (
    <Flex direction={"column"} minW={"170px"}>
      <Select
        isSearchable={false}
        chakraStyles={styles}
        name={name}
        options={groupedNetworkOptionsList}
        placeholder={placeholder}
        components={{
          Option: IconOption,
          ValueContainer: IconValueContainer,
        }}
        onChange={
          onSelectValueChange as (
            props: SingleValue<OptionTypes> | MultiValue<OptionTypes>
          ) => void
        }
      />
    </Flex>
  );
};
