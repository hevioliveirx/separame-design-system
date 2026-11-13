import type * as React from 'react';
export type Space = 'empresa' | 'pessoal';
export type MoneyKind = 'income' | 'expense' | 'neutral' | 'forecast' | 'reserve';
export type IconName = 'home' | 'list' | 'calendar' | 'chart' | 'trend' | 'tax' | 'swap' | 'chat' | 'file' | 'upload' | 'pencil' | 'repeat' | 'check' | 'alert' | 'info' | 'x' | 'plus' | 'up' | 'down' | 'users' | 'settings' | 'more';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; size?: 'md' | 'sm'; icon?: IconName }
export declare function Button(props: ButtonProps): React.ReactElement;
export interface TextFieldProps { label: string; id?: string; hint?: string; error?: string; prefix?: string; placeholder?: string; type?: string; inputMode?: string; value?: string; defaultValue?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }
export declare function TextField(props: TextFieldProps): React.ReactElement;
export interface SpaceSwitcherProps { value?: Space; defaultValue?: Space; onChange?: (space: Space) => void }
export declare function SpaceSwitcher(props: SpaceSwitcherProps): React.ReactElement;
export interface NavItem { icon: IconName; label: string; href?: string; active?: boolean; badge?: string; primary?: boolean }
export interface SidebarNavProps { sections: { title?: string; items: NavItem[] }[]; logoSrc?: string; footer?: React.ReactNode }
export declare function SidebarNav(props: SidebarNavProps): React.ReactElement;
export interface TabBarProps { items: NavItem[] }
export declare function TabBar(props: TabBarProps): React.ReactElement;
export interface KpiCardProps { label: string; value: number | React.ReactNode; kind?: MoneyKind; showSign?: boolean; hint?: string; icon?: IconName; emphasis?: boolean }
export declare function KpiCard(props: KpiCardProps): React.ReactElement;
export interface MoneyProps { value: number; kind?: MoneyKind; size?: 'sm' | 'md' | 'lg' | 'xl'; showSign?: boolean; arrow?: boolean }
export declare function Money(props: MoneyProps): React.ReactElement;
export interface StatusBadgeProps { status: 'pago' | 'recebido' | 'a-vencer' | 'vencido' | 'previsto' | 'conciliado' | 'pendente' | 'reserva'; children?: React.ReactNode }
export declare function StatusBadge(props: StatusBadgeProps): React.ReactElement;
export interface SourceTagProps { source: 'whatsapp' | 'extrato' | 'manual' | 'recorrente' }
export declare function SourceTag(props: SourceTagProps): React.ReactElement;
export interface TransactionRow { date: string; description: string; category: string; space?: Space; source: SourceTagProps['source']; status: StatusBadgeProps['status']; value: number; kind?: MoneyKind }
export interface TransactionTableProps { rows: TransactionRow[]; caption?: string }
export declare function TransactionTable(props: TransactionTableProps): React.ReactElement;
export interface CashFlowPoint { label: string; realized?: number | null; forecast?: number | null }
export interface CashFlowChartProps { data: CashFlowPoint[]; title?: string }
export declare function CashFlowChart(props: CashFlowChartProps): React.ReactElement;
export interface TaxReserveItem { label: string; note?: string; value: number }
export interface TaxReserveCardProps { title?: string; period?: string; reserved: number; target: number; items?: TaxReserveItem[]; disclaimer?: string | false }
export declare function TaxReserveCard(props: TaxReserveCardProps): React.ReactElement;
export interface NoticeProps { tone?: 'info' | 'warning' | 'danger' | 'reserve' | 'success'; title?: string; children?: React.ReactNode }
export declare function Notice(props: NoticeProps): React.ReactElement;
export interface ToastProps { tone?: 'success' | 'danger' | 'info'; title: string; message?: string; action?: string; onAction?: () => void }
export declare function Toast(props: ToastProps): React.ReactElement;
export interface ChatBubbleProps { from?: 'user' | 'bot'; title?: string; time?: string; children?: React.ReactNode }
export declare function ChatBubble(props: ChatBubbleProps): React.ReactElement;
export declare function Icon(props: { name: IconName; size?: number; className?: string }): React.ReactElement;
declare global { interface Window { SeparaMe: { Button: typeof Button; TextField: typeof TextField; SpaceSwitcher: typeof SpaceSwitcher; SidebarNav: typeof SidebarNav; TabBar: typeof TabBar; KpiCard: typeof KpiCard; Money: typeof Money; StatusBadge: typeof StatusBadge; SourceTag: typeof SourceTag; TransactionTable: typeof TransactionTable; CashFlowChart: typeof CashFlowChart; TaxReserveCard: typeof TaxReserveCard; Notice: typeof Notice; Toast: typeof Toast; ChatBubble: typeof ChatBubble; Icon: typeof Icon } } }
