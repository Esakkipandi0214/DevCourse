import React, { useState, useEffect, useRef } from "react";
import { useCourses } from "@/contexts/CourseContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface EditCourseModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  course: {
    id: string;
    title: string;
    description: string;
    price: number;
    tags: string[];
    startingDate: string,
    endingDate: string,
    holidays: string[]
  } | null;
}

const EditCourseModal: React.FC<EditCourseModalProps> = ({ isOpen, onRequestClose, course }) => {
  const { updateCourse } = useCourses();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [tags, setTags] = useState("");
  const [startingDate, setStartingDate] = useState("");
const [endingDate, setEndingDate] = useState("");
const [holidays, setHolidays] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && course) {
      setTitle(course.title);
      setDescription(course.description || "");
      setPrice(course.price);
      setTags(course.tags ? course.tags.join(", ") : "");
      setStartingDate(course.startingDate || "");
    setEndingDate(course.endingDate || "");
    setHolidays(course.holidays ? course.holidays.join(", ") : "");
      setError(null);
      setSuccess(false);
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, course]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && isOpen) {
      onRequestClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onRequestClose]);

  const validateForm = (): boolean => {
    if (!title.trim()) {
      setError("Course title is required");
      return false;
    }
    if (title.trim().length < 3) {
      setError("Course title must be at least 3 characters long");
      return false;
    }
    if (!price || price <= 0) {
      setError("Please enter a valid price greater than 0");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validateForm() || !course) {
      return;
    }

    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);

    setIsLoading(true);
    try {
      await updateCourse(course.id, title.trim(), description.trim(), Number(price), tagsArray,startingDate,
  endingDate,
  holidays.split(",").map(h => h.trim()).filter(h => h));
      setSuccess(true);
      setTimeout(() => {
        onRequestClose();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update course. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onRequestClose();
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || (!isNaN(Number(value)) && Number(value) >= 0)) {
      setPrice(value === "" ? "" : Number(value));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto" aria-describedby="edit-course-description">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Course</DialogTitle>
          <DialogDescription id="edit-course-description">
            Update the details of your course.
          </DialogDescription>
        </DialogHeader>
        {success ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-green-600 font-medium">Course updated successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="course-title" className="text-sm font-medium">
                Course Title *
              </Label>
              <Input
                ref={titleInputRef}
                id="course-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter course title"
                disabled={isLoading}
                aria-required="true"
                aria-invalid={error && !title.trim() ? "true" : "false"}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course-description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="course-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter course description (optional)"
                disabled={isLoading}
                rows={4}
                className="w-full resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course-price" className="text-sm font-medium">
                Price (₹) *
              </Label>
              <Input
                id="course-price"
                type="number"
                value={price}
                onChange={handlePriceChange}
                placeholder="0"
                disabled={isLoading}
                min="0"
                step="1"
                aria-required="true"
                aria-invalid={error && (!price || price <= 0) ? "true" : "false"}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course-tags" className="text-sm font-medium">
                Tags
              </Label>
              <Input
                id="course-tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter tags separated by commas"
                disabled={isLoading}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
  <Label htmlFor="starting-date">Starting Date *</Label>
  <Input
    id="starting-date"
    type="date"
    value={startingDate}
    onChange={(e) => setStartingDate(e.target.value)}
    disabled={isLoading}
  />
</div>
<div className="space-y-2">
  <Label htmlFor="ending-date">Ending Date *</Label>
  <Input
    id="ending-date"
    type="date"
    value={endingDate}
    onChange={(e) => setEndingDate(e.target.value)}
    disabled={isLoading}
  />
</div>
<div className="space-y-2">
  <Label htmlFor="holidays">Holidays</Label>
  <Input
    id="holidays"
    type="text"
    value={holidays}
    onChange={(e) => setHolidays(e.target.value)}
    placeholder="YYYY-MM-DD, YYYY-MM-DD"
    disabled={isLoading}
  />
</div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0 pt-4">
              <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading} className="w-full sm:w-auto bg-transparent">
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || !title.trim() || !price || price <= 0} className="w-full sm:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Course"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditCourseModal;
