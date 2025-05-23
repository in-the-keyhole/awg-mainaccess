import { USAddress } from '../address/usAddress';
import { WeeklySchedule } from '../schedule/weeklySchedule';
import { StoreMemberType } from './store-member-type';
import { StoreStatus } from './store-type';
import { StoreTypeOther } from './store-type-other';

export type Store = {
    id?: string;
    equityNumber?: string;
    storeNumber: string;
    setupDate: string;
    supportCenter: string;
    storeStatus: StoreStatus;
    memberType?: StoreMemberType | null;
    otherStoreType?: StoreTypeOther | null;
    physicalName: string;
    physicalName2?: string;
    physicalAddress: USAddress;
    phone1: string;
    phone2?: string;
    fax?: string;
    email: string;
    email2?: string;
    contact?: string;
    storeManager?: string;
    website?: string;
    mailingName: string;
    mailingAddress?: USAddress;
    shippingAddress?: USAddress;
    billingAddress?: USAddress;
    creditAddress?: USAddress;
    timezone?: string;
    shipTo?: {
        name?: string;
        name2?: string;
        address?: USAddress;
        phone?: string;
        phone2?: string;
        fax?: string;
        email?: string;
        email2?: string;
        contact?: string;
        loadInstructions1?: string;
        loadInstructions2?: string;
        awgDeliveriesPerWeek?: number;
        cigDeliveriesPerWeek?: number;
        substitutionsAllowed?: boolean;
        specialDeliveryNotes?: string;
        awgDeliverySchedule?: WeeklySchedule;
        cigDeliverySchedule?: WeeklySchedule;
        hgsDeliverySchedule?: WeeklySchedule;
    };
    owner?: {
        name?: string;
        name2?: string;
        address?: USAddress;
        phone?: string;
        phone2?: string;
        fax?: string;
        email?: string;
        email2?: string;
        contact?: string;
    };
    otherOwner?: {
        description?: string;
        contact?: string;
        phone?: string;
        email?: string;
    };
};
