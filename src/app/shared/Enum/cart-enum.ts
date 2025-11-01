export enum CartStatus { 
  Draft,
  Pending,
  RequiresAction,
  Processing,
  Paid,
  Refunded,
  Failed,
  Canceled,
}

export enum OrderExitStatus {
  Pending, // قيد المراجعة
  Processing, // قيد التجهيز
  Shipped, // تم الشحن
  InTransit, // في الطريق
  Delivered, // تم التسليم
  Rejected, // مرفوض
  Cancelled, // ملغى
  Returned, // مرتجع
  DeliveryFailed, // فشل التسليم
  ReadyForPickup, // جاهز للاستلام
}
