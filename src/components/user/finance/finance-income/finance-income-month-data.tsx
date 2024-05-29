import React from 'react'
import { expenditureByMonthData, expenditureType, incomeByMonthData, incomeType } from '../const/data'
import { colors } from '../color/color'
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
import { useTheme } from 'next-themes'
import { FinanceIncomeMonth, IncomeType } from '@/types/finance-income'
import { useModal } from '@/hooks/use-modal-store'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { GetIncomeByMonth, GetIncomeSource } from '@/actions/finance-actions'
import { Mosaic } from 'react-loading-indicators'
import { Member } from '@/types/member'


const FinanceIncomeMonthData = ({ month, yearOfMonth, familyId, token, familyMembers }: { month: number, yearOfMonth: number, familyId: string, token: string, familyMembers: Member[] }) => {
    const { theme } = useTheme();
    const [incomeSources, setIncomeSources] = React.useState<IncomeType[]>([])
    const [selectedIncomeSource, setSelectedIncomeSource] = React.useState<number | null>(null)
    const [incomeMonthData, setIncomeMonthData] = React.useState<FinanceIncomeMonth[]>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState<any>(null)
    const [reload, setReload] = React.useState<boolean>(false)
    const { onOpen } = useModal();

    React.useEffect(() => {

        const fetchMonthData = async () => {
            setIsLoading(true)
            try {
                const response = await GetIncomeByMonth(token, familyId, month.toString(), yearOfMonth.toString())
                const incomeSourceRespond = await GetIncomeSource(token, familyId)
                console.log("data nef", response)
                setIncomeMonthData(response)
                setIncomeSources(incomeSourceRespond)
                setIsLoading(false)
            } catch (error) {
                setError(error)
                setIsLoading(false)
            }
        }
        fetchMonthData()

    }, [month, yearOfMonth, familyId, token, reload])

    function filterDataByIncomeSource(id: number) {
        const incomeTypeObj = incomeType.find(item => item.id_income_source === id);
        if (!incomeTypeObj) {
            throw new Error('Invalid id_income_source');
        }
        const categoryName = incomeTypeObj.category;

        return incomeMonthData
            .map(entry => {
                const filteredCategories = entry.categories.filter(cat => cat.name === categoryName);
                if (filteredCategories.length > 0) {
                    return {
                        ...entry,
                        categories: filteredCategories,
                    };
                }
                return null;
            })
            .filter(entry => entry !== null);
    }
    const filteredIncomeData = selectedIncomeSource ? filterDataByIncomeSource(selectedIncomeSource) : incomeMonthData;

    return (
        isLoading ? <>
            <div className='flex flex-1  mt-16'>
                <Mosaic color={theme == 'dark' ? '#fff' : '#000'} size="small" text="Loading" textColor="" />
            </div>
        </> : <>
            <div className="py-4 space-y-4">
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
                    filteredIncomeData.length === 0 ? <>
                        <div className="flex flex-1 justify-center items-center h-64">
                            <p className="text-lg text-gray-500 dark:text-gray-400">No income data available</p>
                        </div>
                    </> : <>
                        {
                            filteredIncomeData.map((item, index) => {
                                const date = new Date(item.date).toLocaleDateString();
                                return (
                                    <div key={index} className=''>
                                        <div className='mb-4 flex justify-between mr-4'>
                                            <p>{date} </p>
                                            <p className={`${theme == 'dark' ? 'text-green-200' : 'text-green-700'} font-medium`}> + {item.total} </p>
                                        </div>
                                        {
                                            item.categories.map((category, index) => {
                                                // const type = expenditureType.find((type) => type.category === category.name)?.id_expense_type;
                                                // const color = colors[type!];

                                                return <>
                                                    <div className={`p-4 rounded-lg shadow-md mb-4   hover:cursor-pointer dark:bg-[#397097] bg-[#4D7FA2] text-white flex justify-between ${index == item.categories.length - 1 ? 'mb-12' : ''}`}
                                                    // style={{
                                                    //     backgroundColor: theme === 'dark' ? color.darkModeBackgroundColor : color.backgroundColor,
                                                    //     color: color.textColor
                                                    // }}
                                                    >
                                                        <p className='font-medium'>{category.name}</p>
                                                        <p className='font-medium'>{category.amount}</p>
                                                    </div>
                                                </>
                                            })
                                        }
                                    </div>
                                )
                            })
                        }

                    </>
                }
            </div>

        </>
    )
}

export default FinanceIncomeMonthData