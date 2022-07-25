export interface CreateExpenseRequest {
    name: string;
    amount: number | string;
    typeId: number | string;
    statusId: number | string;
}