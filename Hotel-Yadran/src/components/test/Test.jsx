import React from 'react'

import { Avatar, Button, Box, Flex, Text, TextArea, Popover } from "@radix-ui/themes"
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@radix-ui/react-checkbox";

import "@radix-ui/themes/styles.css";

function Test() {
  return (
<>

<Popover.Root>
	<Popover.Trigger>
		<Button variant="soft">
			<ChatBubbleIcon width="16" height="16" />
			Comment
		</Button>
	</Popover.Trigger>
	<Popover.Content width="360px">
		<Flex gap="3">
			<Avatar
				size="2"
				src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
				fallback="A"
				radius="full"
			/>
			<Box flexGrow="1">
				<TextArea placeholder="Write a comment…" style={{ height: 80 }} />
				<Flex gap="3" mt="3" justify="between">
					<Flex align="center" gap="2" asChild>
						<Text as="label" size="2">
							<Checkbox />
							<Text>Send to group</Text>
						</Text>
					</Flex>

					<Popover.Close>
						<Button size="1">Comment</Button>
					</Popover.Close>
				</Flex>
			</Box>
		</Flex>
	</Popover.Content>
</Popover.Root>

</>
  )
}

export default Test
