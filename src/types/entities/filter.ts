
// export type AvailableSortValue = 1 | 0;

// export interface ISort = {
//     title?: AvailableSortValue;
//     description?: AvailableSortValue;
//     eventDate: AvailableSortValue;
//     organizer: AvailableSortValue;
// }
export const KnownAvailableSortTypes = ['title', 'description', 'eventDate', 'organizer'] as const;
export type AvailableSortType = typeof KnownAvailableSortTypes[number]

export const KnownAvailableSortDirectionTypes = [1, -1] as const;
export type AvailableSortDirectionType = typeof KnownAvailableSortDirectionTypes[number]

export interface IFilterEventsQueryParams {
      offset?: number;
      limit?: number;
      sortBy?: AvailableSortType;
      sortDirection?: AvailableSortDirectionType;
}

export interface ISortSettings {
    sort?: {
        [K in AvailableSortType]?: AvailableSortDirectionType;
    },
    skip?: number,
    limit?: number,
}