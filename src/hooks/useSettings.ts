import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export type Settings = {
  hotelName: string;
  whatsapp: string;
  additionalNumbers: string;
  domain: string;
  pinAdmin: string;
  heroImageUrl?: string;
  galleryHeroUrl?: string;
};

export const DEFAULT_SETTINGS: Settings = {
  hotelName: "TOGOLIVING",
  whatsapp: "22893872088",
  additionalNumbers: "",
  domain: "https://residencetogoliving.com",
  pinAdmin: "9999",
};

export function useSettings() {
  const queryClient = useQueryClient();

  const { data: settings = DEFAULT_SETTINGS } = useQuery({
    queryKey: ["siteSettings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", "default")
        .single();
      if (error || !data) return DEFAULT_SETTINGS;
      return {
        hotelName: data.hotelName ?? DEFAULT_SETTINGS.hotelName,
        whatsapp: data.whatsappNumber ?? DEFAULT_SETTINGS.whatsapp,
        additionalNumbers: data.additionalNumbers ?? DEFAULT_SETTINGS.additionalNumbers,
        domain: data.domainUrl ?? DEFAULT_SETTINGS.domain,
        pinAdmin: data.pinAdmin ?? DEFAULT_SETTINGS.pinAdmin,
        heroImageUrl: data.heroImageUrl ?? undefined,
        galleryHeroUrl: data.galleryHeroUrl ?? undefined,
      } as Settings;
    },
  });

  const mutation = useMutation({
    mutationFn: async (newSettings: Settings) => {
      const { error } = await supabase
        .from("site_settings")
        .upsert({
          id: "default",
          hotelName: newSettings.hotelName,
          whatsappNumber: newSettings.whatsapp,
          additionalNumbers: newSettings.additionalNumbers,
          domainUrl: newSettings.domain,
          pinAdmin: newSettings.pinAdmin,
          heroImageUrl: newSettings.heroImageUrl,
          galleryHeroUrl: newSettings.galleryHeroUrl,
        });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["siteSettings"] }),
  });

  const setSettings = (s: Settings) => mutation.mutate(s);

  return { settings, setSettings };
}
