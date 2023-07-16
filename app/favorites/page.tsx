import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import getFavoriteListing from "../actions/getFavoriteListing";
import getCurrentUser from "../actions/getCurrentUser";
import FavoriteClient from "./FavoriteClient";


const FavoritesPage = async() => {
  const listings = await getFavoriteListing();
  const currentUser = await getCurrentUser();

  if (listings.length === 0 ) {
    return ( 
    <ClientOnly>
      <EmptyState 
      title="No favorites found"
      subtitle="Looks like you have no favorite listing"
      />
    </ClientOnly>
   );
  }

  return ( 
    <ClientOnly>
      <FavoriteClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
  
}
 
export default FavoritesPage;