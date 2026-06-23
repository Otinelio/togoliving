import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { type JobApplication } from "@/data/defaultJobs";

export function useApplications() {
  const queryClient = useQueryClient();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
        if (error) return [];
        return data as JobApplication[];
      } catch (err) {
        console.error("Supabase error fetching applications:", err);
        return [];
      }
    },
  });

  const addApplicationMutation = useMutation({
    mutationFn: async (application: Omit<JobApplication, "id" | "createdAt" | "status">) => {
      const { data, error } = await supabase.from("applications").insert({
        ...application,
        status: "new",
        created_at: new Date().toISOString()
      }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] }),
  });

  const updateApplicationStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: JobApplication["status"] }) => {
      const { data, error } = await supabase.from("applications").update({ status }).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] }),
  });

  const removeApplicationMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("applications").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] }),
  });

  const addApplication = (application: Omit<JobApplication, "id" | "createdAt" | "status">) => addApplicationMutation.mutate(application);
  const updateStatus = (id: string, status: JobApplication["status"]) => updateApplicationStatusMutation.mutate({ id, status });
  const removeApplication = (id: string) => removeApplicationMutation.mutate(id);

  return { applications, isLoading, addApplication, updateStatus, removeApplication };
}
