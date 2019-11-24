export function extractDateTime(dateTime) {
  const d = new Date(dateTime);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const date = monthNames[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  const time = d.toLocaleString([], {hour: 'numeric', minute: 'numeric', hour12: true});
  return [date, time];
}