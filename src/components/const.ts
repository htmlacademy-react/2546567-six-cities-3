export enum AppRoute {
    Main='/',
    Login='/login',
    Favorite='/favorire',
    Offers='/offers/:id'
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN'
}
