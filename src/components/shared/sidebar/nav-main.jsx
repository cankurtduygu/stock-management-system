import { ChevronRight } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

import {
  BadgeDollarSign,
  Warehouse,
  CircleStar,
  ShoppingCart,
  Boxes,
  ChartNetwork,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const items = [
  {
    title: 'Analytics',
    url: '/stock',
    icon: ChartNetwork,
    isActive: true,

    items: [
      {
        title: 'Overview',
        url: '/stock',
      },
      {
        title: 'Reports',
        url: '/stock/reports',
      },
    ],
  },
  {
    title: 'Purchases',
    url: 'purchases',
    icon: ShoppingCart,
  },
  {
    title: 'Sales',
    url: 'sales',

    icon: BadgeDollarSign,
  },
  {
    title: 'Firms',
    url: 'firms',
    icon: Warehouse,
  },
  {
    title: 'Brands',
    url: 'brands',
    icon: CircleStar,
  },
  {
    title: 'Products',
    url: 'products',
    icon: Boxes,
  },
];

export function NavMain() {
  const location = useLocation(); //paramslari almak icin kullanilir. url i okur ve bize bir location objesi verir. bu objenin pathname propertysi bize url in pathini verir. yani /stock/products gibi bir url varsa pathname bize /stock/products verir. biz de bu pathname i items arrayindeki url lerle karsilastirarak hangi itemin aktif oldugunu bulabiliriz. bu sayede aktif itemi isActive olarak isaretleyebiliriz.
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu className="gap-3 group-data-[collapsible=icon]:gap-3">
        {items.map((item) =>
          item.items ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <Link
                to={`/stock/${item.url}`}
                className="flex items-center gap-2"
              >
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={location.pathname === `/stock/${item.url}`}
                >
                  {item.icon && <item.icon className="text-primary size-4!" />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
