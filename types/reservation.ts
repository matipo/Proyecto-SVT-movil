export interface ReservationItem {
  type: string;
  quantity: number;
}

export interface ReservationPayload {
  event_id: string;
  items: ReservationItem[];
}

export interface ReservationResponse {
  reservation_id: string;
  expires_at: string;
  total_price: number;
  status: 'PENDING' | 'CONFIRMED';
}
