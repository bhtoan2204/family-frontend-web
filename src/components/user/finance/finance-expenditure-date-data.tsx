import React from 'react'
import { expenditureByDateData } from './const/data'

import { colors } from './color/color'
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


const FinanceExpenditureDateData = ({ date, familyId, token }: { date: string, familyId: string, token: string }) => {
    const { data } = expenditureByDateData;
    const { theme } = useTheme();
    return (
        <div className="py-4 space-y-4">
            {data.map((item, index) => {
                const color = colors[item.id_expense_type];

                return (
                    <React.Fragment key={index} >
                        <ContextMenu>
                            <ContextMenuTrigger className="py-4">
                                <div
                                    key={index}
                                    className={`p-4 rounded-lg shadow-md mb-4 `}
                                    style={{
                                        backgroundColor: theme === 'dark' ? color.darkModeBackgroundColor : color.backgroundColor,
                                        color: color.textColor
                                    }}
                                >
                                    <div className="flex justify-between">
                                        <div className="font-bold">{item.expense_category}</div>
                                        <div className='font-bold'>${item.expense_amount}</div>
                                    </div>
                                    <div>{item.description}</div>

                                    <div className="text-xs opacity-75">{item.name}</div>
                                </div>
                            </ContextMenuTrigger>
                            <ContextMenuContent className="w-64">
                                <ContextMenuItem inset>
                                    <p className='text-rose-500'>Delete</p>
                                    <ContextMenuShortcut>Ctrl + D</ContextMenuShortcut>
                                </ContextMenuItem>
                                <ContextMenuItem inset >
                                    Update
                                    <ContextMenuShortcut>Ctrl + U</ContextMenuShortcut>
                                </ContextMenuItem>




                            </ContextMenuContent>
                        </ContextMenu>
                    </React.Fragment>
                )
            })}
        </div>
    )
}
{/* <div
                        key={index}
                        className={`p-4 rounded-lg shadow-md `}
                        style={{
                            backgroundColor: theme === 'dark' ? color.darkModeBackgroundColor : color.backgroundColor,
                            color: color.textColor
                        }}
                    >
                        <div className="flex justify-between">
                            <div className="font-bold">{item.expense_category}</div>
                            <div className='font-bold'>${item.expense_amount}</div>
                        </div>
                        <div>{item.description}</div>

                        <div className="text-xs opacity-75">{item.name}</div>
                    </div> */}
export default FinanceExpenditureDateData