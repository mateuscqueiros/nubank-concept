'use client';

import { AddTransaction } from '@/components/Actions';
import { CategoriesProgress, TransactionItem } from '@/components/Elements';
import { ModalsContext } from '@/providers';
import { DataContext } from '@/providers/DataProvider';
import { ElementType, Transaction } from '@/types';
import { isAfter, isToday, isYesterday } from 'date-fns';
import { useContext } from 'react';

type TransactionDayProps = {
  title: string;
  items: Transaction[];
} & ElementType;

function TransactionSection({ title, items }: TransactionDayProps) {
  const modals = useContext(ModalsContext);

  return (
    <div>
      <h3 className="font-bold text-xl mb-5">{title}</h3>
      <ul className="relative flex flex-col gap-5 w-full before:absolute before:content-[''] before:left-[23px] before:h-full before:w-[2px] before:bg-gray-200">
        {items.map((item) => (
          <li
            className="cursor-pointer"
            key={`transaction-item-${item.id}`}
            onClick={() => modals.openUpdate('transaction', item)}
          >
            <TransactionItem data={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TransactionsPage() {
  const data = useContext(DataContext);

  const transactions = [...data.transactions.data].sort((a, b) =>
    isAfter(a.date, b.date) ? -1 : 1
  );
  const today = transactions.filter((transaction) => isToday(transaction.date));
  const yesterday = transactions.filter((transaction) => isYesterday(transaction.date));
  const previous = transactions.filter(
    (transaction) => !isToday(transaction.date) && !isYesterday(transaction.date)
  );

  const totalExpenses = transactions.reduce((acc, item) => acc + item.value, 0).toFixed(2);

  return (
    <div className="flex flex-col p-6 pt-10">
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-3xl mb-5">Transações</h1>
        <AddTransaction />
      </div>
      <div className="flex flex-row flex-wrap gap-x-[300px] gap-y-10 justify-center w-full p-12 bg-contrast rounded-xl mb-10">
        <div className="flex flex-col font-bold justify-center text-primary">
          <div>
            <span className="font-medium">Total de gastos:</span> R$ {totalExpenses}
          </div>
        </div>
        <CategoriesProgress className="!justify-center max-w-[400px] flex-wrap gap-x-20 gap-y-10" />
      </div>
      <div className="flex flex-col max-w-[600px] w-full mx-auto gap-10">
        {today.length > 0 && <TransactionSection title="Hoje" items={today} />}
        {yesterday.length > 0 && <TransactionSection title="Ontem" items={yesterday} />}
        {previous.length > 0 && (
          <TransactionSection title={today && yesterday && 'Anterior'} items={previous} />
        )}
      </div>
    </div>
  );
}
