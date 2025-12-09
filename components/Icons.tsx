import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';

export function HomeIcon(props: any) {
  return <MaterialCommunityIcons name="home-outline" size={30} {...props} />;
}
export function TicketIcon(props: any) {
  return <MaterialCommunityIcons name="ticket-confirmation-outline" size={30} {...props} />;
}
export function CartIcon(props: any) {
  return <MaterialCommunityIcons name="cart-check" size={30} {...props} />;
}
export function SearchIcon(props: any) {
  return <MaterialCommunityIcons name="layers-search" size={30} {...props} />;
}
export function CloseIcon(props: any) {
  return <MaterialCommunityIcons name="close" size={25} {...props} />;
}
export function CalendarIcon(props: any) {
  return <Ionicons name="calendar-outline" size={30} {...props} />;
}

export function ClockIcon(props: any) {
  return <MaterialCommunityIcons name="clock-time-eight-outline" size={30} {...props} />;
}

export function LocationIcon(props: any) {
  return <Ionicons name="location-outline" size={30} color="black" {...props} />;
}
