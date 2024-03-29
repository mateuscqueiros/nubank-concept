import { DataContext, ModalsContext } from '@/providers';
import { ElementType } from '@/types';
import { IconTrash } from '@tabler/icons-react';
import { useContext } from 'react';

export type DeleteTransactionProps = {
  itemId: string;
} & ElementType;

export function DeleteTransaction({ itemId, className }: DeleteTransactionProps) {
  const dataContext = useContext(DataContext);
  const modalsContext = useContext(ModalsContext);

  const transactionModal = modalsContext.data.find((modal) => modal.id === 'transaction');

  const transactions = dataContext.transactions;

  return (
    <div className={className}>
      <div className="tooltip" data-tip="Deletar Transação">
        <button
          type="button"
          className="btn btn-square bg-transparent border-primary border-2 hover:bg-primary hover:border-transparent text-primary hover:text-white"
          onClick={() => {
            transactionModal?.close();
            transactions.delete(itemId);
          }}
        >
          <IconTrash size={24} />
        </button>
      </div>
    </div>
  );
}
