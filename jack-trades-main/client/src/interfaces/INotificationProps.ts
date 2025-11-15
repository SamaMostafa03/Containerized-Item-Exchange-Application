/* eslint-disable @typescript-eslint/indent */
interface INotificationProps {
    id: number,
    createdAt?: string,
    updatedAt?: string,
    date: string,
    exchanged_id: number | null,
    first_name: string,
    last_name: string,
    gallery: string[],
    image: string | null
    product_id: number,
    products: number[] | null,
    receiver_approval: boolean | null,
    receiver_id: number,
    sender_id: number,
    status: string,
    title: string,
    type: string,
}

export default INotificationProps;
