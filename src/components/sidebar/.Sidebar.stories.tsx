// disabled for now
// not working with react router???

import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Sidebar from "./Sidebar";

const meta: Meta = {
  title: "Components/Sidebar",
  component: Sidebar,
};

export default meta;

const Template: StoryFn = () => <Sidebar />;

// Default story for the Sidebar
export const Default = Template.bind({});
Default.args = {};
