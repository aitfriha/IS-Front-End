import { Ability } from '@casl/ability';

// abilities examples

export default new Ability([
    {
        action: 'consult',
        subject: 'code',
    },
    {
        action: 'consult',
        subject: 'value',
    },
    {
        action: 'read',
        subject: 'sentence',
        fields: 'code'
    },
    {
        action: 'delete',
        subject: 'sentence',
    }
]);
