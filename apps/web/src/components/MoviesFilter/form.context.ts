// form-context.ts file
import { createFormContext } from '@mantine/form';
import { SearchQueryForm } from 'app-types';

export const [FilterFormProvider, useFilterFormContext, useFilterForm] = createFormContext<SearchQueryForm>();
