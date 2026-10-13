package com.hcl.library.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;

/** HashMap-backed repository; the id of an entity is extracted with the supplied function. */
public class InMemoryRepository<T, ID> implements Repository<T, ID> {

    private final Map<ID, T> store = new HashMap<>();
    private final Function<T, ID> idExtractor;

    public InMemoryRepository(Function<T, ID> idExtractor) {
        this.idExtractor = Objects.requireNonNull(idExtractor, "idExtractor");
    }

    @Override
    public void save(T entity) {
        Objects.requireNonNull(entity, "entity");
        store.put(idExtractor.apply(entity), entity);
    }

    @Override
    public Optional<T> findById(ID id) {
        return Optional.ofNullable(store.get(id));
    }

    /** Returns an immutable snapshot, so callers cannot corrupt the store. */
    @Override
    public List<T> findAll() {
        return List.copyOf(store.values());
    }

    @Override
    public boolean deleteById(ID id) {
        return store.remove(id) != null;
    }
}
