import { Checkbox } from "@/components/ui/checkbox";
import {
  Button,
  Card,
  CheckboxGroup,
  Fieldset,
  HStack,
} from "@chakra-ui/react";

interface Props {
  filters: string[];
  activeFilters: string[];
  onFilterChange: (filter: string) => void;
  onClearFilters: () => void;
}

const Filters = ({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
}: Props) => {
  return (
    <Card.Root shadow="lg" borderRadius="sm" border="none" overflow="hidden">
      <Card.Body gap="2">
        <HStack justifyContent="space-between" paddingBottom={2}>
          <Card.Title fontSize="1.6em">Filters</Card.Title>
          <Button variant="ghost" onClick={onClearFilters}>
            Clear
          </Button>
        </HStack>
        <Card.Description>
          <Fieldset.Root>
            <CheckboxGroup value={activeFilters}>
              <Fieldset.Content>
                {filters.map((filter) => (
                  <Checkbox
                    value={filter}
                    key={filter}
                    onChange={() => onFilterChange(filter)}
                  >
                    {filter}
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
