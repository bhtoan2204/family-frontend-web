import React from 'react'
import { expenditureByDateData, expenditureType } from '../const/data'

import { colors } from '../color/color'
import { useTheme } from 'next-themes'
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useModal } from '@/hooks/use-modal-store'
import { ExpenditureType, FinanceExpenditureDate } from '@/types/finance-expenditure'
import { GetExpenditureByDate, GetIncomeByDate, GetIncomeSource } from '@/actions/finance-actions'
import { Mosaic } from 'react-loading-indicators'
import { FinanceIncomeDate, IncomeType } from '@/types/finance-income'
import { incomeByDateData, incomeType } from '../const/data'
import { Member } from '@/types/member'

const FinanceIncomeDateData = ({ date, familyId, token, familyMembers }: { date: string, familyId: string, token: string, familyMembers: Member[] }) => {
    // const { data } = expenditureByDateData;
    const [incomeSources, setIncomeSources] = React.useState<IncomeType[]>([])
    const [selectedIncomeSource, setSelectedIncomeSource] = React.useState<number | null>(null)
    const [incomeDateData, setIncomeDateDate] = React.useState<FinanceIncomeDate[]>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState<any>(null)
    const [reload, setReload] = React.useState<boolean>(false)
    const { theme } = useTheme();
    const { onOpen } = useModal();

    React.useEffect(() => {
        console.log(date)
        const fetchDateData = async () => {
            setIsLoading(true)
            try {
                const response = await GetIncomeByDate(date, familyId, token)
                const incomeSourcesRespond = await GetIncomeSource(token, familyId)
                console.log("data nef", response)
                setIncomeDateDate(response)
                setIncomeSources(incomeSourcesRespond)
                setIsLoading(false)
            } catch (error) {
                setError(error)
                setIsLoading(false)
            }
        }
        fetchDateData()

    }, [date, familyId, token, reload])

    const filteredIncomeData = selectedIncomeSource ? incomeDateData.filter((item) => item.id_income_source === selectedIncomeSource) : incomeDateData

    return (
        isLoading ? <>
            <div className='flex flex-1  mt-16'>
                <Mosaic color={theme == 'dark' ? '#fff' : '#000'} size="small" text="Loading" textColor="" />
            </div>
        </> : <div className="py-4 space-y-4">

            <ScrollArea className="overflow-x-auto py-2 mb-4">
                <div className="flex space-x-4 ">
                    <button
                        onClick={() => {
                            onOpen("createIncome", {
                                createIncome: {
                                    id_family: parseInt(familyId),
                                    setReload: setReload,
                                    token: token,
                                    familyMembers: familyMembers,
                                    incomeTypes: incomeSources
                                }
                            });
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition bg-gray-700 dark:bg-white text-gray-200 dark:text-gray-700 w-auto h-10 clear-both whitespace-nowrap hover:opacity-65`}
                    >
                        Add Income
                    </button>
                    <button
                        onClick={() => {
                            onOpen('createIncomeType', {
                                createIncomeType: {
                                    id_family: parseInt(familyId),
                                    setIncomeTypes: setIncomeSources,
                                }
                            })

                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 w-auto h-10 clear-both whitespace-nowrap hover:opacity-65`}
                    >
                        Add income source
                    </button>

                    {incomeSources.map((type, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (selectedIncomeSource === index + 1) {
                                    setSelectedIncomeSource(null)
                                } else {
                                    setSelectedIncomeSource(index + 1)
                                }
                            }}
                            className={`px-4 py-2 rounded-lg w-auto clear-both  text-sm font-semibold transition whitespace-nowrap hover:opacity-65 ${selectedIncomeSource === index + 1
                                ? 'bg-black dark:bg-white text-white dark:text-black'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 '
                                }`}
                        >
                            {type.category}
                        </button>
                    ))}
                </div>
                <div className='py-2'></div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {
                incomeDateData.length === 0 ? <>
                    <div className="flex flex-1 justify-center items-center h-64">
                        <p className="text-lg text-gray-500 dark:text-gray-400">No income data available</p>
                    </div>

                </> : <>
                    {filteredIncomeData.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <ContextMenu>
                                    <ContextMenuTrigger className="py-4">
                                        <div
                                            // className={`p-4 rounded-lg shadow-md mb-4 `}
                                            className={'p-4 rounded-lg  shadow-md mb-4 dark:bg-[#397097] bg-[#4D7FA2] text-white'}
                                        >
                                            <div className="flex justify-between">
                                                <div className="font-bold">{item.income_category}</div>
                                                <div className='font-bold'>${item.income_amount}</div>
                                            </div>
                                            <div>{item.description}</div>
                                            <div className="text-xs opacity-75">{item.name}</div>
                                        </div>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent className="w-64 bg-white dark:bg-gray-800 dark:text-gray-300 rounded-lg shadow-md">
                                        <ContextMenuItem
                                            inset
                                            onClick={() => console.log("Delete clicked")}
                                            className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <p className='text-rose-500'>Delete</p>
                                            <ContextMenuShortcut>Ctrl + D</ContextMenuShortcut>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            inset
                                            onClick={() => console.log("Update clicked")}
                                            className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            Update
                                            <ContextMenuShortcut>Ctrl + U</ContextMenuShortcut>
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            </React.Fragment>
                        );
                    })}
                </>
            }
        </div>
    )
}

export default FinanceIncomeDateData