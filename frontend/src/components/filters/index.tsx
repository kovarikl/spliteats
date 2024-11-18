import { Card } from "@chakra-ui/react";
import { CheckboxGroup, Fieldset } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";

const Filters = ({ categories = [], onChange }) => {
    return (
        <Card.Root shadow="lg" borderRadius="lg" border="none" overflow="hidden">
            <Card.Body gap="2">
                <Card.Title fontSize="1.6em">Filters</Card.Title>
                <Card.Description>
                    <Fieldset.Root>
                        <CheckboxGroup onChange={onChange}>
                            <Fieldset.Content>
                                {categories.map((category) => (
                                    <Checkbox value={category} key={category}>
                                        {category}
                                    </Checkbox>
                                ))}
                            </Fieldset.Content>
                        </CheckboxGroup>
                    </Fieldset.Root>
                </Card.Description>
            </Card.Body>
        </Card.Root>
    );
};

export { Filters };