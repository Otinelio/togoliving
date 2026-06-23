import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { type Job, DEFAULT_JOBS } from "@/data/defaultJobs";

export function useJobs() {
  const queryClient = useQueryClient();

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from("jobs").select("*").order("id");
        if (error) return DEFAULT_JOBS;
        if (!data || data.length === 0) return DEFAULT_JOBS;
        
        return data as Job[];
      } catch (err) {
        console.error("Supabase fallback to default jobs:", err);
        return DEFAULT_JOBS;
      }
    },
  });

  const addJobMutation = useMutation({
    mutationFn: async (job: Omit<Job, "id">) => {
      const { data, error } = await supabase.from("jobs").insert(job).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
  });

  const updateJobMutation = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<Job> }) => {
      const { data, error } = await supabase.from("jobs").update(patch).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
  });

  const removeJobMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("jobs").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
  });

  const addJob = (job: Omit<Job, "id">) => addJobMutation.mutate(job);
  const updateJob = (id: string, patch: Partial<Job>) => updateJobMutation.mutate({ id, patch });
  const removeJob = (id: string) => removeJobMutation.mutate(id);

  return { jobs, isLoading, addJob, updateJob, removeJob };
}
