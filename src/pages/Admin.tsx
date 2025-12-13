import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload, Trash2, Image, Video, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MediaItem {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number | null;
  mime_type: string | null;
  alt_text: string | null;
  created_at: string;
}

const Admin = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMedia = async () => {
    const { data, error } = await supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error fetching media", description: error.message, variant: "destructive" });
    } else {
      setMedia(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    for (const file of Array.from(files)) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file);

      if (uploadError) {
        toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
        continue;
      }

      const fileType = file.type.startsWith("video") ? "video" : "image";

      const { error: dbError } = await supabase.from("media").insert({
        file_name: file.name,
        file_path: filePath,
        file_type: fileType,
        file_size: file.size,
        mime_type: file.type,
      });

      if (dbError) {
        toast({ title: "Database error", description: dbError.message, variant: "destructive" });
      }
    }

    toast({ title: "Upload complete", description: "Files uploaded successfully" });
    fetchMedia();
    setUploading(false);
    e.target.value = "";
  };

  const handleDelete = async (item: MediaItem) => {
    const { error: storageError } = await supabase.storage
      .from("media")
      .remove([item.file_path]);

    if (storageError) {
      toast({ title: "Delete failed", description: storageError.message, variant: "destructive" });
      return;
    }

    const { error: dbError } = await supabase.from("media").delete().eq("id", item.id);

    if (dbError) {
      toast({ title: "Database error", description: dbError.message, variant: "destructive" });
      return;
    }

    toast({ title: "Deleted", description: "File removed successfully" });
    fetchMedia();
  };

  const getPublicUrl = (filePath: string) => {
    const { data } = supabase.storage.from("media").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "Unknown";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Media Manager</h1>
          <p className="text-muted-foreground">Upload and manage images and videos</p>
        </div>

        <div className="mb-8">
          <label className="cursor-pointer">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-foreground font-medium mb-1">Click to upload</p>
              <p className="text-sm text-muted-foreground">Images (JPEG, PNG, WebP, GIF) or Videos (MP4, WebM, MOV)</p>
              {uploading && (
                <div className="flex items-center justify-center mt-4">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  <span>Uploading...</span>
                </div>
              )}
            </div>
            <Input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : media.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Image className="mx-auto h-16 w-16 mb-4 opacity-50" />
            <p>No media uploaded yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {media.map((item) => (
              <Card key={item.id} className="overflow-hidden group">
                <CardContent className="p-0 relative">
                  {item.file_type === "video" ? (
                    <div className="aspect-square bg-muted flex items-center justify-center">
                      <video
                        src={getPublicUrl(item.file_path)}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                      />
                      <Video className="absolute h-8 w-8 text-white drop-shadow-lg" />
                    </div>
                  ) : (
                    <img
                      src={getPublicUrl(item.file_path)}
                      alt={item.alt_text || item.file_name}
                      className="aspect-square object-cover w-full"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(item)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-2 bg-card">
                    <p className="text-xs text-foreground truncate">{item.file_name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(item.file_size)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
