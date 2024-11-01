import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Select, MenuItem, TextField } from "@mui/material";
import AccountTable from "./AccountTable";

// Mock data
const rows = [
  {
    label: "Business Type",
    input: (
      <Select fullWidth name="businessType" value="" displayEmpty>
        <MenuItem value="" disabled>
          Select Business Type
        </MenuItem>
        <MenuItem value="type1">Type 1</MenuItem>
        <MenuItem value="type2">Type 2</MenuItem>
        <MenuItem value="type3">Type 3</MenuItem>
      </Select>
    ),
  },
  {
    label: "Business Name",
    input: (
      <Select fullWidth name="businessName" value="" displayEmpty>
        <MenuItem value="" disabled>
          Select Business Name
        </MenuItem>
        <MenuItem value="name1">Business Name 1</MenuItem>
        <MenuItem value="name2">Business Name 2</MenuItem>
      </Select>
    ),
  },
  {
    label: "Role",
    input: (
      <Select fullWidth name="role" value="" displayEmpty>
        <MenuItem value="" disabled>
          Select Role
        </MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="user">User</MenuItem>
      </Select>
    ),
  },
  {
    label: "Login ID",
    input: <TextField fullWidth name="loginId" placeholder="Enter Login ID" />,
  },
  {
    label: "Email",
    input: <TextField fullWidth name="email" placeholder="Enter Email" />,
  },
];

export default {
  title: "Components/AccountTable",
  component: AccountTable,
} as ComponentMeta<typeof AccountTable>;

// Story template
const Template: ComponentStory<typeof AccountTable> = (args) => (
  <AccountTable {...args} />
);

// Default story
export const Default = Template.bind({});
Default.args = {
  rows,
};

// CustomRows story
export const CustomRows = Template.bind({});
CustomRows.args = {
  rows: [
    {
      label: "Custom Field 1",
      input: (
        <TextField fullWidth name="customField1" placeholder="Custom Value 1" />
      ),
    },
    {
      label: "Custom Field 2",
      input: (
        <Select fullWidth name="customField2" value="" displayEmpty>
          <MenuItem value="" disabled>
            Select Option
          </MenuItem>
          <MenuItem value="option1">Option 1</MenuItem>
          <MenuItem value="option2">Option 2</MenuItem>
        </Select>
      ),
    },
  ],
};
